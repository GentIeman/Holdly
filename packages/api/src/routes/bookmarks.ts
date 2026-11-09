import { Hono } from "hono"
import { ofetch } from "ofetch"
import qs from "qs"

import { getAccessToken } from "../utils/cookies"
import { httpError } from "../utils/errors"
import { origin, requestOptions } from "../utils/config"
import { validate } from "../utils/validation"
import {
  bookmarkBodySchema,
  bookmarksQuerySchema,
  linkMetadataQuerySchema
} from "../schemas/bookmarks"

const bookmarks = new Hono()

bookmarks.get("/bookmarks", validate("query", bookmarksQuerySchema), async (ctx) => {
  const token = getAccessToken(ctx)
  const { userDocumentId } = ctx.req.valid("query")

  const queryString = qs.stringify(
    {
      fields: ["title", "description", "createdAt", "link", "preview"],
      sort: ["createdAt:desc"],
      filters: {
        user: {
          documentId: {
            $eq: userDocumentId
          }
        }
      }
    },
    { encodeValuesOnly: true }
  )

  const res = await ofetch.raw(origin + `/api/bookmarks?${queryString}`, {
    ...requestOptions,
    headers: { Authorization: `Bearer ${token}` }
  })

  if (!res.ok) {
    return httpError(ctx, 500, "INTERNAL_ERROR", "Internal server error")
  }

  const { data } = res._data

  return ctx.json(data)
})

bookmarks.post("/bookmark", validate("json", bookmarkBodySchema), async (ctx) => {
  const token = getAccessToken(ctx)
  const body = ctx.req.valid("json")

  const res = await ofetch.raw(origin + "/api/bookmarks", {
    ...requestOptions,
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: { data: { ...body } }
  })

  if (!res.ok) {
    return httpError(ctx, 500, "INTERNAL_ERROR", "Internal server error")
  }

  const { data } = res._data

  return ctx.json(data)
})

bookmarks.get("/link-metadata", validate("query", linkMetadataQuerySchema), async (ctx) => {
  const { url } = ctx.req.valid("query")

  const res = await ofetch.raw<string, "text">(url, {
    ...requestOptions,
    responseType: "text",
    timeout: 5_000
  })

  if (!res.ok) {
    return httpError(ctx, 500, "FETCH_FAILED", "Unable to fetch the link")
  }

  const html = res._data ?? ""

  const title =
    html.match(/<meta property="og:title" content="(.*?)"/)?.[1] ||
    html.match(/<title>(.*?)<\/title>/)?.[1]

  const description =
    html.match(/<meta property="og:description" content="(.*?)"/)?.[1] ||
    html.match(/<meta name="description" content="(.*?)"/)?.[1]

  const preview = html.match(/<meta property="og:image" content="(.*?)"/)?.[1]

  const siteName = html.match(/<meta property="og:site_name" content="(.*?)"/)?.[1]

  return ctx.json({
    title: title?.trim() || new URL(url).hostname,
    description: description?.trim(),
    preview: preview?.trim(),
    siteName: siteName?.trim()
  })
})

export default bookmarks
