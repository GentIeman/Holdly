import { Hono } from "hono"

import { loginSchema, registerSchema } from "../schemas/auth"
import { getAccessToken, getRefreshToken, setAuthCookies } from "../utils/cookies"
import { httpError } from "../utils/errors"
import { validate } from "../utils/validation"

const auth = new Hono()

const origin = import.meta.env.VITE_STRAPI_ORIGIN

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

auth.post("/login", validate("json", loginSchema), async (ctx) => {
  const body = ctx.req.valid("json")

  const res = await fetch(origin + "/api/auth/local", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  })

  if (!res.ok) {
    return httpError(ctx, 401, "UNAUTHORIZED", "Invalid credentials")
  }

  const data: AuthResponse = await res.json()

  setAuthCookies(ctx, { accessToken: data.jwt, refreshToken: data.refreshToken })

  return ctx.json({ user: data.user })
})

auth.post("/register", validate("json", registerSchema), async (ctx) => {
  const body = ctx.req.valid("json")

  const res = await fetch(origin + "/api/auth/local/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  })

  if (!res.ok) {
    const isClientError = res.status === 400

    return httpError(
      ctx,
      isClientError ? 400 : 502,
      isClientError ? "VALIDATION_ERROR" : "UPSTREAM_ERROR",
      "Unable to register"
    )
  }

  const data: AuthResponse = await res.json()

  setAuthCookies(ctx, { accessToken: data.jwt, refreshToken: data.refreshToken })

  return ctx.json({ user: data.user })
})

auth.get("/me", async (ctx) => {
  const token = getAccessToken(ctx)

  if (!token) {
    return httpError(ctx, 401, "UNAUTHORIZED", "Unauthorized")
  }

  const res = await fetch(origin + "/api/users/me", {
    headers: { Authorization: `Bearer ${token}` }
  })

  if (!res.ok) {
    return httpError(ctx, 502, "UPSTREAM_ERROR", "Unable to load the user")
  }

  return ctx.json(await res.json())
})

auth.post("/refresh", async (ctx) => {
  const refreshToken = getRefreshToken(ctx)

  if (!refreshToken) {
    return httpError(ctx, 401, "UNAUTHORIZED", "Unauthorized")
  }

  const res = await fetch(origin + "/api/auth/refresh", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refreshToken })
  })

  if (!res.ok) {
    return httpError(ctx, 502, "UPSTREAM_ERROR", "Unable to refresh the session")
  }

  const data: AuthResponse = await res.json()

  setAuthCookies(ctx, {
    accessToken: data.jwt,
    refreshToken: data.refreshToken ?? refreshToken
  })

  return ctx.json({ ok: true })
})

export default auth