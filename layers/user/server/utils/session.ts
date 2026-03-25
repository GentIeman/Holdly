import type {H3Event} from "h3"
import {setRefreshToken, clearRefreshToken} from "./cookies/refreshToken"
import {setAccessToken, clearAccessToken} from "./cookies/accessToken"

type Tokens = {
    accessToken: string
    refreshToken: string
}

export function applySession(event: H3Event, tokens: Tokens) {
    setAccessToken(event, tokens.accessToken)
    setRefreshToken(event, tokens.refreshToken)
}

export function destroySession(event: H3Event) {
    clearAccessToken(event)
    clearRefreshToken(event)
}