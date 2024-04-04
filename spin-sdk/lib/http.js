// @ts-ignore
import { ResponseOutparam, Fields, OutgoingResponse, OutgoingBody } from 'wasi:http/types@0.2.0';
const decoder = new TextDecoder();
const encoder = new TextEncoder();
export class SimpleHTTP {
    constructor() {
        this.handle = this.handle.bind(this);
        this.handleRequest = this.handleRequest.bind(this);
    }
    async handleRequest(req, res) {
        throw "not implemented";
    }
    async handle(request, response_out) {
        let method = request.method();
        let request_body = request.consume();
        let request_stream = request_body.stream();
        let body = new Uint8Array();
        while (true) {
            try {
                body = new Uint8Array([...body, ...request_stream.blockingRead(16 * 1024)]);
            }
            catch (e) {
                if (e.payload?.tag === "closed") {
                    break;
                }
                throw (e);
            }
        }
        let request_uri = request.pathWithQuery();
        let url = request_uri ? request_uri : "/";
        let headers = new Headers();
        request.headers().entries().forEach(([key, value]) => {
            headers.append(key, decoder.decode(value));
        });
        let req = {
            method: method.tag.toString().toUpperCase(),
            uri: url,
            headers: headers,
            body: body,
        };
        let res = new ResponseBuilder(response_out);
        try {
            await this.handleRequest(req, res);
        }
        catch (e) {
            console.log(e.message);
        }
    }
}
export class ResponseBuilder {
    constructor(responseOut) {
        this.responseOut = responseOut;
        this.statusCode = 200;
        this.headers = new Headers();
        this.hasWrittenHeaders = false;
        this.hasSentResponse = false;
    }
    status(code) {
        if (this.hasWrittenHeaders) {
            throw new Error("Headers and Status already sent");
        }
        this.statusCode = code;
        return this;
    }
    getStatus() {
        return this.statusCode;
    }
    set(arg1, arg2) {
        if (this.hasWrittenHeaders) {
            throw new Error("Headers already sent");
        }
        if (typeof arg1 === 'string' && typeof arg2 === 'string') {
            this.headers.set(arg1, arg2);
        }
        else if (typeof arg1 === 'object' && arg2 === undefined) {
            for (const key in arg1) {
                this.headers.set(key, arg1[key]);
            }
        }
        else {
            throw new Error('Invalid arguments');
        }
        return this;
    }
    send(value = new Uint8Array()) {
        if (this.hasSentResponse) {
            throw new Error("Response has already been sent");
        }
        // if (value) {
        this.write(value);
        this.end();
        // } else {
        //     this.response = new OutgoingResponse(new Fields() as headers) as OutgoingResponseType
        //     this.responseBody = this.response.body()
        //     this.responseStream = this.responseBody.write()
        //     this.response.setStatusCode(this.statusCode)
        //     ResponseOutparam.set(this.responseOut, { tag: "ok", val: this.response })
        //     this.end()
        // }
        this.hasSentResponse = true;
    }
    write(value) {
        if (this.hasSentResponse) {
            throw new Error("Response has already been sent");
        }
        if (!this.hasWrittenHeaders) {
            let headers = new Fields();
            this.headers.forEach((value, key) => {
                headers.append(key, encoder.encode(value));
            });
            this.response = new OutgoingResponse(headers);
            this.responseBody = this.response.body();
            this.responseStream = this.responseBody.write();
            this.response.setStatusCode(this.statusCode);
            ResponseOutparam.set(this.responseOut, { tag: "ok", val: this.response });
            this.hasWrittenHeaders = true;
        }
        writeBytesToOutputStream(value, this.responseStream);
    }
    end() {
        // The following if seems redundant as the execution of the module
        // terminates as soon as the response is sent. 
        if (this.hasSentResponse) {
            throw new Error("Response has already been sent");
        }
        // The OutgoingBody here is untyped because I have not figured out how to do that in typescript yet.
        OutgoingBody.finish(this.responseBody, { tag: "none" });
        this.hasSentResponse = true;
    }
}
function writeBytesToOutputStream(body, responseStream) {
    let bytes = convertToUint8Array(body);
    const MAX_BLOCKING_WRITE_SIZE = 4096;
    let offset = 0;
    while (offset < bytes.length) {
        const count = Math.min(bytes.length - offset, MAX_BLOCKING_WRITE_SIZE);
        responseStream.blockingWriteAndFlush(bytes.slice(offset, offset + count));
        offset += count;
    }
}
function convertToUint8Array(body) {
    if (body instanceof ArrayBuffer) {
        return new Uint8Array(body);
    }
    else if (ArrayBuffer.isView(body)) {
        return new Uint8Array(body.buffer, body.byteOffset, body.byteLength);
    }
    else if (typeof body === 'string') {
        const encoder = new TextEncoder();
        const utf8Array = encoder.encode(body);
        return utf8Array;
    }
    else if (body instanceof URLSearchParams) {
        const encoder = new TextEncoder();
        const bodyString = body.toString();
        const utf8Array = encoder.encode(bodyString);
        return utf8Array;
    }
    else {
        throw new Error('Unsupported body type');
    }
}
