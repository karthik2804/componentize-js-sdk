import { SimpleHTTP } from "spin-sdk"
import { SimpleRequest, ResponseBuilder } from "spin-sdk/lib/http";
import { createSSRApp } from "vue";
import { renderToString } from 'vue/server-renderer'
//@ts-ignore
import appVue from "./app.vue"
const app = createSSRApp(appVue);

class HttpHandler extends SimpleHTTP {
    constructor() {
        super();
    }
    async handleRequest(req: SimpleRequest, res: ResponseBuilder) {
        let html = await renderToString(app)
        res.status(200)
        res.set("abc", "xyz")
        res.send(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>Vue SSR Example</title>
          </head>
          <body>
            <div id="app">${html}</div>
          </body>
        </html>
        `)
    }
}

export const incomingHandler = new HttpHandler()

