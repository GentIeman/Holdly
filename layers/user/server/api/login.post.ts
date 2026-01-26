import {setCookie, readBody} from "h3";
import type {User} from "~~/layers/user/app/composables/useUser"

export type Response = {
    jwt: string
    user: User
}

export type RequestBody = {
    identifier: string
    password: string
}

export default defineEventHandler(async (event) => {
    const body = await readBody<RequestBody>(event)
    const config = useRuntimeConfig()

    const {jwt, user} = await $fetch<Response>(config.public.strapiOrigin + "/api/auth/local", {
        method: "POST",
        headers: {
            "Content-type": "application/json",
        },
        body: body,
    })

    if (!user) return null

    setCookie(event, "strapi_jwt", jwt, {
        httpOnly: true,
        priority: "high",
        secure: process.env.NODE_ENV === "production",
    })

    return {user}
})