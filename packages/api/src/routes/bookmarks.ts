import {Hono} from 'hono'
import {getAccessToken} from '../utils/cookies'
import qs from 'qs'

const origin = process.env.STRAPI_ORIGIN

type Bookmark = {
    documentId: string
    title: string
    description: string
    link: string
    preview: string
    createdAt: string
}

const bookmarks = new Hono()

bookmarks.get('/bookmarks', async (c) => {
    const token = getAccessToken(c)
    const userDocumentId = c.req.query('userDocumentId')

    const queryString = qs.stringify(
        {
            fields: ['title', 'description', 'createdAt', 'link', 'preview'],
            sort: ['createdAt:desc'],
            filters: {
                user: {
                    documentId: {
                        $eq: userDocumentId,
                    },
                },
            },
        },
        {encodeValuesOnly: true},
    )

    const res = await fetch(origin + `/api/bookmarks?${queryString}`, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    })

    const {data} = await res.json()

    return c.json(data)
})

bookmarks.post('/bookmark', async (c) => {
    const token = getAccessToken(c)
    const body = await c.req.json()

    const res = await fetch(origin + '/api/bookmarks', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({data: {...body}}),
    })

    const {data} = await res.json()

    return c.json(data)
})

bookmarks.get('/link-metadata', async (c) => {
    const url = c.req.query('url')

    if (!url) {
        return c.json({error: 'URL is required'}, 400)
    }

    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 5000)

    try {
        const html = await fetch(url, {signal: controller.signal}).then((r) => r.text())

        const title =
            html.match(/<meta property="og:title" content="(.*?)"/)?.[1] ||
            html.match(/<title>(.*?)<\/title>/)?.[1]

        const description =
            html.match(/<meta property="og:description" content="(.*?)"/)?.[1] ||
            html.match(/<meta name="description" content="(.*?)"/)?.[1]

        const preview = html.match(/<meta property="og:image" content="(.*?)"/)?.[1]

        const siteName = html.match(/<meta property="og:site_name" content="(.*?)"/)?.[1]

        return c.json({title, description, preview, siteName})
    } catch (e: any) {
        if (e.name === 'AbortError') {
            return c.json({error: 'Link preview request timed out'}, 504)
        }
        return c.json({error: 'Failed to fetch link preview'}, 400)
    } finally {
        clearTimeout(timeout)
    }
})

export default bookmarks
