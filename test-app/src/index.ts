import { SimpleHTTP } from "spin-sdk"
import { SimpleRequest, ResponseBuilder } from "spin-sdk/lib/http";
import { createApp } from "./app.js";
import { renderToString } from 'vue/server-renderer'
import { initRouter } from "./router.js";

const app = createApp();
let router = initRouter(true)
app.use(router)
class HttpHandler extends SimpleHTTP {
  constructor() {
    super();
  }
  async handleRequest(req: SimpleRequest, res: ResponseBuilder) {
    let path = "/" + req.uri.split("/").pop() || "/";
    router.push(path)
    await router.isReady()
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
            <script src="/static/bundle.js"></script>
          </body>
        </html>
        `)
  }
}

export const incomingHandler = new HttpHandler()

