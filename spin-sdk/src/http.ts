// @ts-ignore
import { ResponseOutparam, Fields, OutgoingResponse, OutgoingBody } from 'wasi:http/types@0.2.0'
import { headers, IncomingRequest, OutputStream, OutgoingResponse as OutgoingResponseType, OutgoingBody as OutgoingBodyType } from './types/wasi-http'

export class SimpleHTTP {
    constructor() {
        this.handle = this.handle.bind(this)
        this.handleRequest = this.handleRequest.bind(this)
    }
    async handleRequest(req: any, res: ResponseBuilder) {
        throw "not implemented"
    }
    async handle(request: IncomingRequest, response_out: OutputStream) {
        let method = request.method()

        let request_body = request.consume()
        let request_stream = request_body.stream()
        let body = new Uint8Array()

        while (true) {
            try {
                body = new Uint8Array([...body, ...request_stream.blockingRead(16 * 1024)])
            } catch (e: any) {
                if (e.payload?.tag === "closed") {
                    break
                }
                throw (e)
            }
        }


        let request_uri = request.pathWithQuery()
        let url = request_uri ? request_uri : "/"

        let res = new ResponseBuilder(response_out)
        try {
            await this.handleRequest(null, res)
        }
        catch (e: any) {
            console.log(e.message)
        }

        if (!res.isComplete()) {
            throw new Error("handleRequest did not return a proper response")
        }
    }
}

// FormData and Blob need to be added
export type BodyInit = BufferSource | URLSearchParams | ReadableStream<Uint8Array> | USVString;

export type USVString = string | ArrayBuffer | ArrayBufferView;

export class ResponseBuilder {
    headers: Headers
    private hasWrittenHeaders: boolean
    private hasSentResponse: boolean
    private responseOut: OutputStream
    private statusCode: number
    private responseBody: OutgoingBodyType | undefined
    private responseStream: OutputStream | undefined
    private response: OutgoingResponseType | undefined

    constructor(responseOut: OutputStream) {
        this.responseOut = responseOut
        this.statusCode = 200
        this.headers = new Headers()
        this.hasWrittenHeaders = false
        this.hasSentResponse = false
    }
    status(code: number): this {
        if (this.hasWrittenHeaders) {
            throw new Error("Headers and Status already sent")
        }
        this.statusCode = code
        return this
    }
    getStatus(): number {
        return this.statusCode
    }
    set(arg1: string | { [key: string]: string }, arg2?: string): this {
        if (this.hasWrittenHeaders) {
            throw new Error("Headers already sent")
        }
        if (typeof arg1 === 'string' && typeof arg2 === 'string') {
            this.headers.set(arg1, arg2);
        } else if (typeof arg1 === 'object' && arg2 === undefined) {
            for (const key in arg1) {
                this.headers.set(key, arg1[key]);
            }
        } else {
            throw new Error('Invalid arguments');
        }
        return this
    }
    send(value?: BodyInit) {
        if (this.hasSentResponse) {
            throw new Error("Response has already been sent")
        }
        if (value) {
            this.write(value)
            this.end()
        } else {
            this.response = new OutgoingResponse(new Fields() as headers) as OutgoingResponseType
            this.responseBody = this.response.body()
            this.responseStream = this.responseBody.write()
            this.response.setStatusCode(this.statusCode)
            ResponseOutparam.set(this.responseOut, { tag: "ok", val: this.response })
            this.end()
        }
        this.hasSentResponse = true
    }
    write(value: BodyInit) {
        if (this.hasSentResponse) {
            throw new Error("Response has already been sent")
        }
        if (!this.hasWrittenHeaders) {
            this.response = new OutgoingResponse(new Fields() as headers) as OutgoingResponseType
            this.responseBody = this.response.body()
            this.responseStream = this.responseBody.write()
            this.response.setStatusCode(this.statusCode)
            ResponseOutparam.set(this.responseOut, { tag: "ok", val: this.response })
            this.hasWrittenHeaders = true
        }
        writeBytesToOutputStream(value, this.responseStream!)
    }
    end() {
        // The following if seems redundant as the execution of the module
        // terminates as soon as the response is sent. 
        if (this.hasSentResponse) {
            throw new Error("Response has already been sent")
        }
        // The OutgoingBody here is untyped because I have not figured out how to do that in typescript yet.
        OutgoingBody.finish(this.responseBody!, { tag: "none" });
        this.hasSentResponse = true
    }
    isComplete() {
        return this.hasSentResponse
    }
}

function writeBytesToOutputStream(body: BodyInit, responseStream: OutputStream) {
    let bytes = convertToUint8Array(body)
    const MAX_BLOCKING_WRITE_SIZE = 4096
    let offset = 0
    while (offset < bytes.length) {
        const count = Math.min(bytes.length - offset, MAX_BLOCKING_WRITE_SIZE)
        responseStream.blockingWriteAndFlush(bytes.slice(offset, offset + count))
        offset += count
    }
}

function convertToUint8Array(body: BodyInit): Uint8Array {
    if (body instanceof ArrayBuffer) {
        return new Uint8Array(body);
    } else if (ArrayBuffer.isView(body)) {
        return new Uint8Array(body.buffer, body.byteOffset, body.byteLength);
    } else if (typeof body === 'string') {
        const encoder = new TextEncoder();
        const utf8Array = encoder.encode(body);
        return utf8Array;
    } else if (body instanceof URLSearchParams) {
        const encoder = new TextEncoder();
        const bodyString = body.toString();
        const utf8Array = encoder.encode(bodyString);
        return utf8Array;
    } else {
        throw new Error('Unsupported body type');
    }
}