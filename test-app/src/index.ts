import { SimpleHTTP } from "spin-sdk"
// import { Llm } from "spin-sdk";
import { SimpleRequest, ResponseBuilder } from "spin-sdk/lib/http";

class HttpHandler extends SimpleHTTP {
    constructor() {
        super();
    }
    async handleRequest(req: SimpleRequest, res: ResponseBuilder) {
        res.status(200)
        res.set("abc", "xyz")
        res.send("hello world")
        res.end()
    }
}

export const incomingHandler = new HttpHandler()


// import * as redis from "fermyon:spin/redis@2.0.0"
// const decoder = new TextDecoder()

// export const inboundRedis = {
//     handleMessage(msg) {
//         console.log(redis)
//         let test = redis.Connection.open("redis://localhost:6379")
//         console.log(decoder.decode(test.get("test")))
//         // let kv = store.open("default")
//         // console.log(kv.exists("test"))
//         console.log(decoder.decode(msg))

//     }
// }