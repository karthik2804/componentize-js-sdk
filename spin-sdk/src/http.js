import { ResponseOutparam, Fields, OutgoingResponse } from 'wasi:http/types@0.2.0'

const decoder = new TextDecoder()

export class SimpleHTTP {
    constructor() {
        this.handle = this.handle.bind(this)
        this.handleRequest = this.handleRequest.bind(this)
    }
    async handleRequest() {
        throw "not implemented"
    }
    async handle(request, response_out) {
        let method = request.method()

        let request_body = request.consume()
        let request_stream = request_body.stream()
        let body = new Uint8Array()

        while (true) {
            try {
                body = new Uint8Array([...body, ...await request_stream.blockingRead(16 * 1024)])
            } catch (e) {
                if (e.payload?.tag === "closed") {
                    break
                }
                throw (e)
            }
        }

        let request_uri = request.pathWithQuery()
        let url = request_uri ? request_uri : "/"

        let response = new OutgoingResponse(new Fields())
        let response_body = response.body()
        response.setStatusCode(200)
        ResponseOutparam.set(response_out, { tag: "ok", val: response })
        let response_stream = response_body.write()
        let simple_body = await this.handleRequest()

        if (simple_body) {
            const MAX_BLOCKING_WRITE_SIZE = 4096
            let offset = 0
            while (offset < simple_body.length) {
                const count = Math.min(simple_body.length - offset, MAX_BLOCKING_WRITE_SIZE)
                response_stream.blockingWriteAndFlush(simple_body.slice(offset, offset + count))
                offset += count
            }
        }
        response_stream.drop();
        OutgoingBody.finish(response_body, { tag: "none" });
    }
}