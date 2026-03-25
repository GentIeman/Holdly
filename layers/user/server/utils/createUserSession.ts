import type { H3Event } from "h3"
import {applySession} from "./session"
import type {User} from "../../app/composables/useUser"

type Response = {
    user: User
    jwt: string
    refreshToken: string
}

export function createUserSession(
    event: H3Event,
    response: Response
) {
    const { user, jwt, refreshToken } = response

    applySession(event, {
        accessToken: jwt,
        refreshToken
    })

    return { user }
}