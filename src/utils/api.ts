import { FetchError, ofetch } from "ofetch"

import type { ErrorMessages } from "./errorMessages"

export const api = ofetch.create({
  baseURL: import.meta.env.VITE_API_BASE,
  credentials: "include"
})

export function getErrorCode(error: unknown): string {
  return error instanceof FetchError ? (error.data?.error?.code ?? "UNKNOWN") : "UNKNOWN"
}

export function getErrorMessage(error: unknown, messages: ErrorMessages): string {
  return messages[getErrorCode(error)] ?? messages.FALLBACK
}