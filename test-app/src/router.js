import { createWebHistory, createRouter, createMemoryHistory } from 'vue-router'

import helloWorld from './hello-world.vue';
import anotherComponent from './another-component.vue';

const routes = [
    { path: '/', component: helloWorld },
    { path: '/about', component: anotherComponent },
]

export const initRouter = (server) => {
    if (server) {
        return createRouter({
            history: createMemoryHistory(),
            routes,
        })
    }
    return createRouter({
        history: createWebHistory(),
        routes,
    })
}