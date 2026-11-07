import { Hono } from "hono"
import qs from "qs"

import { getAccessToken } from "../utils/cookies"
import { httpError } from "../utils/errors"
import { validate } from "../utils/validation"
import {
  bookmarkBodySchema,
  bookmarksQuerySchema,
  linkMetadataQuerySchema
} from "../schemas/bookmarks"

const origin = import.meta.env.VITE_STRAPI_ORIGIN

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

  const res = await fetch(origin + `/api/bookmarks?${queryString}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  })

  if (!res.ok) {
    return httpError(ctx, 502, "UPSTREAM_ERROR", "Unable to load bookmarks")
  }

  const { data } = await res.json()

  return ctx.json(data)
})

bookmarks.post("/bookmark", validate("json", bookmarkBodySchema), async (ctx) => {
  const token = getAccessToken(ctx)
  const body = ctx.req.valid("json")

  const res = await fetch(origin + "/api/bookmarks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ data: { ...body } })
  })

  if (!res.ok) {
    return httpError(ctx, 502, "UPSTREAM_ERROR", "Unable to save the bookmark")
  }

  const { data } = await res.json()

  return ctx.json(data)
})

bookmarks.get("/link-metadata", validate("query", linkMetadataQuerySchema), async (ctx) => {
  const { url } = ctx.req.valid("query")

  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(5000) })

    if (!res.ok) {
      return httpError(ctx, 502, "FETCH_FAILED", "Unable to fetch the link")
    }

    const html = await res.text()

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
  } catch (error: unknown) {
    if (error instanceof DOMException && error.name === "TimeoutError") {
      return httpError(ctx, 504, "FETCH_TIMEOUT", "The request timed out")
    }

    return httpError(ctx, 502, "FETCH_FAILED", "Could not reach the link")
  }
})

export default bookmarks