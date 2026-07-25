import { useUserStore } from "~~/layers/user/app/stores/user"

export default defineNuxtRouteMiddleware(async () => {
  const userStore = useUserStore()

  if (!userStore.user) {
    try {
      await userStore.fetchMe()
    } catch {
      return navigateTo("/sign")
    }
  }
})