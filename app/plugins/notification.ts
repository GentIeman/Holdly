import { createNotificationsPlugin } from "@vuetify/v0"

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(createNotificationsPlugin())
})