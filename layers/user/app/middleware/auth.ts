export default defineNuxtRouteMiddleware(async () => {

    const user = useUser()

    if (user.value) return

    try {
        user.value = await $fetch('/api/me', {
            credentials: 'include'
        })
    } catch {
        return navigateTo('/sign')
    }
})