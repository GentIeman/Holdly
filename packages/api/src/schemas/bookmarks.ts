import { z } from "zod"

import { externalUrlSchema } from "./externalUrl"

export const bookmarksQuerySchema = z.object({
  user: z.string().regex(/^[a-z0-9_-]+$/i)
})

export const bookmarkParamsSchema = z.object({
  id: z.string().regex(/^[a-z0-9_-]+$/i)
})

export const bookmarkBodySchema = z.object({
  link: z.httpUrl(),
  title: z.string().optional(),
  description: z.string().optional(),
  preview: z.string().optional(),
  user: z.string().regex(/^[a-z0-9_-]+$/i)
})

export const linkMetadataQuerySchema = z.object({
  url: externalUrlSchema
})