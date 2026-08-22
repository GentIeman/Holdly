import { createPinia } from "pinia"
import { createNotificationsPlugin } from "@vuetify/v0"
import { createApp } from "vue"

import App from "./App.vue"
import router from "./router"

import "./assets/css/main.css"

createApp(App).use(createPinia()).use(createNotificationsPlugin()).use(router).mount("#app")