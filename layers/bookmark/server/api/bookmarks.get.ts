import {getCookie} from "h3";
import type {Bookmark} from "~/layers/bookmark/components/Bookmark.vue";

export type Response = Bookmark[]

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig()

    const token = getCookie(event, "strapi_jwt")

    const {data} = await $fetch<{data: Response}>(config.public.strapiOrigin + "/api/bookmarks", {
        headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
        }
    })

    return data
})