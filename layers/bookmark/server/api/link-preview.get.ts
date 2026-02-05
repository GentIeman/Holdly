import {createError} from "h3"
export default defineEventHandler(async (event) => {
    const url = getQuery(event).url as string

    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 5000)

    try {
        const html = await $fetch<string>(url, {
            signal: controller.signal,
        })

        const title =
            html.match(/<meta property="og:title" content="(.*?)"/)?.[1] ||
            html.match(/<title>(.*?)<\/title>/)?.[1]

        const description =
            html.match(/<meta property="og:description" content="(.*?)"/)?.[1] ||
            html.match(/<meta name="description" content="(.*?)"/)?.[1]

        const image =
            html.match(/<meta property="og:image" content="(.*?)"/)?.[1]

        return {title, description, image}
    } catch (e: any) {
        if (e.name === 'AbortError') {
            throw createError({
                statusCode: 504,
                statusMessage: 'Link preview request timed out',
                data: {
                    url,
                    timeout: 5000,
                },
            })
        }
        throw createError({
            statusCode: 400,
            statusMessage: 'Failed to fetch link preview',
            data: {
                url,
                cause: e?.message ?? String(e),
            },
        })
    } finally {
        clearTimeout(timeout)
    }
})
