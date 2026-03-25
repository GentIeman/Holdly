export type Response = {
    user: User
}

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig()
    const token = getCookie(event, "access_token")

    if (!token) {
        throw createError({ statusCode: 401 })
    }

    return await $fetch<Response>(config.public.strapiOrigin + "/api/users/me", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        onResponseError() {
            throw createError({ statusCode: 500 })
        }
    })
})