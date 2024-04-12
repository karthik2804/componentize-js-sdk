import { createSSRApp } from 'vue';
import appVue from "./app.vue"
export function createApp() {
    return createSSRApp(appVue);
}
