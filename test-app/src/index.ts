import { SimpleHTTP } from "spin-sdk"
import { SimpleRequest, ResponseBuilder } from "spin-sdk/lib/http";
import { renderToString } from 'vue/server-renderer'
import { createApp } from './app.js'

const app = createApp();

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
            <script src="/static/bundle.js"></script>
          </body>
        </html>
        `)
  }
}

export const incomingHandler = new HttpHandler()

