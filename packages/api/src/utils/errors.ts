import type { Context } from "hono"
import type { ContentfulStatusCode } from "hono/utils/http-status"

type HttpErrorCode =
  | "VALIDATION_ERROR"
  | "UNAUTHORIZED"
  | "NOT_FOUND"
  | "FETCH_FAILED"
  | "INTERNAL_ERROR"

export function httpError(
  ctx: Context,
  status: ContentfulStatusCode,
  code: HttpErrorCode,
  message: string
) {
  return ctx.json({ error: { code, message } }, status)
}