import {useAuth} from "~/layers/user/composables/useAuth"
export default defineNuxtRouteMiddleware(async (to, _from) => {
    const user = useUser()

    const {me} = useAuth()

    try {
        if (!user.value) {
            await me()
        }
    } catch (e) {
        useCookie('redirect', { path: '/', httpOnly: true, secure: true, sameSite: 'strict' }).value = to.fullPath
        return navigateTo('/sign')
    }
})