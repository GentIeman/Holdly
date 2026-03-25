import {createUserSession} from "../utils/createUserSession"

export type Response = {
    jwt: string
    refreshToken: string
    user: User
}

export type RequestBody = {
    identifier: string
    password: string
}

export default defineEventHandler(async (event) => {
    const body = await readBody<RequestBody>(event)
    const config = useRuntimeConfig()

    const response = await $fetch<Response>(config.public.strapiOrigin + "/api/auth/local", {
        method: "POST",
        headers: {
            "Content-type": "application/json",
        },
        body,
        onResponseError() {
            throw createError({
                statusCode: 500
            })
        }
    })

    if (!response.user) {
        throw createError({ statusCode: 401 })
    }

    return createUserSession(event, response)
})