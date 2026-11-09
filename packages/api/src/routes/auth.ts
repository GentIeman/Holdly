import { Hono } from "hono"
import { ofetch } from "ofetch"

import { loginSchema, registerSchema } from "../schemas/auth"
import { getAccessToken, getRefreshToken, setAuthCookies } from "../utils/cookies"
import { httpError } from "../utils/errors"
import { origin, requestOptions } from "../utils/config"
import { validate } from "../utils/validation"

const auth = new Hono()

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

  const res = await ofetch.raw<AuthResponse>(origin + "/api/auth/local", {
    ...requestOptions,
    method: "POST",
    body
  })

  if (!res.ok) {
    return httpError(ctx, 401, "UNAUTHORIZED", "Invalid credentials")
  }

  const data = res._data as AuthResponse

  setAuthCookies(ctx, { accessToken: data.jwt, refreshToken: data.refreshToken })

  return ctx.json({ user: data.user })
})

auth.post("/register", validate("json", registerSchema), async (ctx) => {
  const body = ctx.req.valid("json")

  const res = await ofetch.raw<AuthResponse>(origin + "/api/auth/local/register", {
    ...requestOptions,
    method: "POST",
    body
  })

  if (!res.ok) {
    const isClientError = res.status === 400

    return httpError(
      ctx,
      isClientError ? 400 : 500,
      isClientError ? "VALIDATION_ERROR" : "INTERNAL_ERROR",
      isClientError ? "Unable to register" : "Internal server error"
    )
  }

  const data = res._data as AuthResponse

  setAuthCookies(ctx, { accessToken: data.jwt, refreshToken: data.refreshToken })

  return ctx.json({ user: data.user })
})

auth.get("/me", async (ctx) => {
  const token = getAccessToken(ctx)

  if (!token) {
    return httpError(ctx, 401, "UNAUTHORIZED", "Unauthorized")
  }

  const res = await ofetch.raw<User>(origin + "/api/users/me", {
    ...requestOptions,
    headers: { Authorization: `Bearer ${token}` }
  })

  if (!res.ok) {
    if (res.status === 401) {
      return httpError(ctx, 401, "UNAUTHORIZED", "Unauthorized")
    }

    return httpError(ctx, 500, "INTERNAL_ERROR", "Internal server error")
  }

  return ctx.json(res._data as User)
})

auth.post("/refresh", async (ctx) => {
  const refreshToken = getRefreshToken(ctx)

  if (!refreshToken) {
    return httpError(ctx, 401, "UNAUTHORIZED", "Unauthorized")
  }

  const res = await ofetch.raw<AuthResponse>(origin + "/api/auth/refresh", {
    ...requestOptions,
    method: "POST",
    body: { refreshToken }
  })

  if (!res.ok) {
    return httpError(ctx, 500, "INTERNAL_ERROR", "Internal server error")
  }

  const data = res._data as AuthResponse

  setAuthCookies(ctx, {
    accessToken: data.jwt,
    refreshToken: data.refreshToken ?? refreshToken
  })

  return ctx.json({ ok: true })
})

export default auth
