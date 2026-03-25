import type {H3Event} from "h3"
import {setCookie, deleteCookie} from "h3"

export function setRefreshToken(event: H3Event, token: string) {
    setCookie(event, "refresh_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        sameSite: "lax" as const,
        maxAge: 2592000
    })
}

export function clearRefreshToken(event: H3Event) {
    deleteCookie(event, "refresh_token")
}