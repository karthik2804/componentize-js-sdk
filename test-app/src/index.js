import { SimpleHTTP } from "spin-sdk"
import { Llm } from "spin-sdk";

class HttpHandler extends SimpleHTTP {
    constructor() {
        super();
    }
    async handleRequest() {
        console.log("hello")
        let res = Llm.infer(Llm.InferencingModels.Llama2Chat, "tell me a joke")
        console.log(res)
        return new TextEncoder().encode("hello world")
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