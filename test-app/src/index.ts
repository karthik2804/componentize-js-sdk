import { KeyValue, Mqtt, Mysql, Postgres, Redis, SimpleHTTP, Sqlite, Variables } from "spin-sdk"
// import { Llm } from "spin-sdk";
import { SimpleRequest, ResponseBuilder } from "spin-sdk/lib/http";
import { QoS } from "spin-sdk/lib/mqtt";
import { valueInteger } from "spin-sdk/lib/sqlite";

class HttpHandler extends SimpleHTTP {
    constructor() {
        super();
    }
    async handleRequest(req: SimpleRequest, res: ResponseBuilder) {
        console.log(Variables.get("test123"))
        let db = Redis.open("redis://localhost:6379")
        console.log(new TextDecoder().decode(db.get("test")))
        let kv = KeyValue.openDefault()

        console.log("\n\nKV tests")
        kv.set("test", "value")
        console.log(kv.getKeys())
        console.log(kv.get("test"))

        // console.log("\n\nSqlite tests")
        // let sdb = Sqlite.openDefault()
        // console.log(sdb.execute("SELECT * FROM todos WHERE id = (?);", [valueInteger(1)]))

        // console.log("\n\n PG test")
        // let pdb = Postgres.open("user=postgres dbname=spin_dev host=127.0.0.1")
        // console.log(pdb.query("select * from test", []))


        // console.log("\n\n Mysql test")
        // let mdb = Mysql.open("mysql://root:@127.0.0.1/spin_dev")
        // console.log(mdb.query("select * from test", []))

        console.log("MQTT tests")
        let mqtt = Mqtt.open("mqtt://localhost:1883?client_id=client001", "user", "password", 30)
        mqtt.publish("telemetry", new TextEncoder().encode("Eurela"), QoS.AtLeastOnce)

        res.status(200)
        res.set("abc", "xyz")
        res.send("hello world\n")
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