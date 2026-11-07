import { FetchError, ofetch } from "ofetch"

type ApiErrorResponse = {
  error?: {
    code?: string
    message?: string
  }
}

export class ApiError extends Error {
  readonly code?: string

  constructor(message: string, options: { code?: string; cause?: unknown } = {}) {
    super(message, { cause: options.cause })
    this.name = "ApiError"
    this.code = options.code
  }
}

function fromResponse(data: unknown, fallback: string, cause?: unknown): ApiError {
  const payload = (data as ApiErrorResponse | undefined)?.error

  return new ApiError(payload?.message ?? fallback, {
    code: payload?.code,
    cause
  })
}

export function toApiError(error: unknown): ApiError {
  if (error instanceof ApiError) return error

  if (error instanceof FetchError) {
    return fromResponse(error.data, error.message, error)
  }

  return new ApiError(error instanceof Error ? error.message : "Unknown error", {
    cause: error
  })
}

export const api = ofetch.create({
  baseURL: import.meta.env.VITE_API_BASE,
  credentials: "include",
  onResponseError({ response }) {
    throw fromResponse(response._data, response.statusText || "Request failed")
  }
})