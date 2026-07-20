import type { Context } from 'hono'
import { getCookie, setCookie, deleteCookie } from 'hono/cookie'

const isProd = process.env.NODE_ENV === 'production'

export function getAccessToken(c: Context) {
  return getCookie(c, 'access_token')
}

export function getRefreshToken(c: Context) {
  return getCookie(c, 'refresh_token')
}

export function setAccessToken(c: Context, token: string) {
  setCookie(c, 'access_token', token, {
    httpOnly: true,
    secure: isProd,
    path: '/',
    sameSite: 'Lax',
    maxAge: 604800, // 7 days
  })
}

export function setRefreshToken(c: Context, token: string) {
  setCookie(c, 'refresh_token', token, {
    httpOnly: true,
    secure: isProd,
    path: '/',
    sameSite: 'Lax',
    maxAge: 2592000, // 30 days
  })
}

export function setAuthCookies(c: Context, tokens: { accessToken: string; refreshToken: string }) {
  setAccessToken(c, tokens.accessToken)
  setRefreshToken(c, tokens.refreshToken)
}

export function clearAuthCookies(c: Context) {
  deleteCookie(c, 'access_token')
  deleteCookie(c, 'refresh_token')
}
