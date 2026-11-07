import type { Context } from "hono"
import type { ContentfulStatusCode } from "hono/utils/http-status"

type HttpErrorCode =
  | "VALIDATION_ERROR"
  | "UNAUTHORIZED"
  | "NOT_FOUND"
  | "FETCH_FAILED"
  | "FETCH_TIMEOUT"
  | "UPSTREAM_ERROR"
  | "INTERNAL_ERROR"

type HttpErrorDetail = {
  path: string
  message: string
}

type HttpErrorBody = {
  error: {
    code: HttpErrorCode
    message: string
    details?: HttpErrorDetail[]
  }
}

export function httpError(
  ctx: Context,
  status: ContentfulStatusCode,
  code: HttpErrorCode,
  message: string,
  details?: HttpErrorDetail[]
) {
  const body: HttpErrorBody = {
    error: {
      code,
      message,
      ...(details?.length ? { details } : {})
    }
  }

  return ctx.json(body, status)
}