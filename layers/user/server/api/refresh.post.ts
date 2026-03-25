import {applySession} from "../utils/session"

export type Response = {
    jwt: string
    refreshToken?: string
    user?: User
}

export default defineEventHandler(async (event) => {
    const refreshToken = getCookie(event, "refresh_token")
    if (!refreshToken) throw createError({ statusCode: 401 })

    const config = useRuntimeConfig()

    const {jwt, refreshToken: newRefreshToken } = await $fetch<Response>(config.public.strapiOrigin + "/api/auth/refresh", {
        method: "POST",
        body: { refreshToken },
        onResponseError() {
            throw createError({ statusCode: 500 })
        }
    })

    applySession(event, {
        accessToken: jwt,
        refreshToken: newRefreshToken ?? refreshToken
    })

    return { ok: true }
})