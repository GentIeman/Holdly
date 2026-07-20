export default defineNuxtRouteMiddleware(async () => {
  const user = useUser()
  const config = useRuntimeConfig()

  if (user.value) return

  try {
    user.value = await $fetch("/api/me", {
      baseURL: config.public.apiBase as string,
      credentials: "include"
    })
  } catch {
    return navigateTo("/sign")
  }
})