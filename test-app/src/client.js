import { createApp } from './app.js'
import { initRouter } from './router.js'

let app = createApp()
let router = initRouter()

app.use(router).mount('#app')