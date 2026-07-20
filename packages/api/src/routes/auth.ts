import {Hono} from 'hono'
import {getAccessToken, getRefreshToken, setAuthCookies} from '../utils/cookies'

const auth = new Hono()

const origin = process.env.STRAPI_ORIGIN

type User = {
    blocked: boolean
    createdAt: string
    documentId: string
    email: string
    id: number
    username: string
}

type AuthResponse = {
    jwt: string
    refreshToken: string
    user: User
}

auth.post('/login', async (c) => {
    const body = await c.req.json<{ identifier: string; password: string }>()

    const res = await fetch(origin + '/api/auth/local', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(body),
    })

    if (!res.ok) {
        return c.json({error: 'Unauthorized'}, 401)
    }

    const data: AuthResponse = await res.json()

    setAuthCookies(c, {accessToken: data.jwt, refreshToken: data.refreshToken})

    return c.json({user: data.user})
})

auth.post('/register', async (c) => {
    const body = await c.req.json<{ email: string; password: string; username: string }>()

    const res = await fetch(origin + '/api/auth/local/register', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(body),
    })

    if (!res.ok) {
        return c.json({error: 'Unauthorized'}, 401)
    }

    const data: AuthResponse = await res.json()

    setAuthCookies(c, {accessToken: data.jwt, refreshToken: data.refreshToken})

    return c.json({user: data.user})
})

auth.get('/me', async (c) => {
    const token = getAccessToken(c)

    if (!token) {
        return c.json({error: 'Unauthorized'}, 401)
    }

    const res = await fetch(origin + '/api/users/me', {
        headers: {Authorization: `Bearer ${token}`},
    })

    if (!res.ok) {
        return c.json({error: 'Internal Server Error'}, 500)
    }

    return c.json(await res.json())
})

auth.post('/refresh', async (c) => {
    const refreshToken = getRefreshToken(c)

    if (!refreshToken) {
        return c.json({error: 'Unauthorized'}, 401)
    }

    const res = await fetch(origin + '/api/auth/refresh', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({refreshToken}),
    })

    if (!res.ok) {
        return c.json({error: 'Internal Server Error'}, 500)
    }

    const data: AuthResponse = await res.json()

    setAuthCookies(c, {
        accessToken: data.jwt,
        refreshToken: data.refreshToken ?? refreshToken,
    })

    return c.json({ok: true})
})

export default auth
