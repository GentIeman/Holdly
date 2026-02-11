import {getCookie, readBody} from "h3"
import type {Bookmark} from "~~/layers/bookmark/app/components/Bookmark.vue"
import fetchStrapi from "~~/shared/utils/fetchStrapi"

export type Response = Bookmark

type RequestBody = {
    title: string
    link: string
    description?: string
    preview?: string,
    user: User["documentId"]
}

export default defineEventHandler(async (event) => {

    const token = getCookie(event, "strapi_jwt")

    const body = await readBody<RequestBody>(event)

    const {data} = await fetchStrapi<Response>(`/api/bookmarks`, {
        method: "POST",
        headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: {
            data: {...body}
        }
    })

    return data
})