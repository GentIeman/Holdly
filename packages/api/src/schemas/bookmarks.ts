import { z } from "zod"

export const bookmarksQuerySchema = z.object({
  userDocumentId: z.string().min(1)
})

export const bookmarkBodySchema = z.object({
  link: z.httpUrl(),
  title: z.string().optional(),
  description: z.string().optional(),
  preview: z.string().optional(),
  user: z.string().min(1)
})

export const linkMetadataQuerySchema = z.object({
  url: z.httpUrl()
})