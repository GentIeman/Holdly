import {getCookie, getQuery} from "h3";
import qs from "qs";
import type {Bookmark} from "~~/layers/bookmark/app/components/Bookmark.vue";

export type Response = Bookmark[]

type RequestParams = {
    userDocumentId: string
}

export default defineEventHandler(async (event) => {

    const token = getCookie(event, "strapi_jwt")

    const requestQuery = getQuery<RequestParams>(event)

    const queryString  = qs.stringify(
        {
            fields: ['title', 'description', 'createdAt', "link"],
            sort: ['createdAt:desc'],
            filters: {
                user: {
                    documentId: {
                        $eq: requestQuery.userDocumentId
                    }
                }
            },
            populate: {
                preview: {
                    fields: ['url', 'width', 'height']
                }
            },
        },
        {
            encodeValuesOnly: true,
        }
    )

    const {data} = await fetchStrapi<Response>(`/api/bookmarks?${queryString}`, {
        headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
        }
    })

    return data
})