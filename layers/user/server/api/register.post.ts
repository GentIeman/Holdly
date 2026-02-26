export type Response = {
    jwt: string
    user: User
}

export type RequestBody = {
    email: string
    password: string
    username: string
}

export default defineEventHandler(async (event) => {
    const body = await readBody<RequestBody>(event)
    const config = useRuntimeConfig()

    const {jwt, user} = await $fetch<Response>(config.public.strapiOrigin + "/api/auth/local/register", {
        method: "POST",
        headers: {
            "Content-type": "application/json",
        },
        body: body,
        onResponseError() {
            throw createError({
                statusCode: 500
            })
        }
    })

    if (!user) return null

    setCookie(event, "strapi_jwt", jwt, {
        httpOnly: true,
        priority: "high",
        secure: process.env.NODE_ENV === "production",
    })

    return {user}

})