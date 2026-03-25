import type {H3Event} from "h3"
import {setCookie, deleteCookie} from "h3"

export function setAccessToken(event: H3Event, token: string) {
    setCookie(event, "access_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        sameSite: "lax" as const,
        maxAge: 604800
    })
}

export function clearAccessToken(event: H3Event) {
    deleteCookie(event, "access_token")
}