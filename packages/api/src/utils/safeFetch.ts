import ipaddr from "ipaddr.js"
import { ofetch } from "ofetch"
import { z } from "zod"

const MAX_METADATA_BYTES = 512 * 1024 // 512 KB

const CLIENT_URL_ERRORS = new Set([
  "INVALID_URL",
  "UNSAFE_URL",
  "REDIRECT_NOT_ALLOWED",
  "RESPONSE_TOO_LARGE"
])

// Blocks localhost and reserved/internal hostnames before any network request.
const BLOCKED_HOSTNAME_REQ =
  /^(?!localhost(?:\.|$))(?!.*\.(?:localhost|local|internal)(?:\.|$)).+$/i

const externalUrlSchema = z.url({
  protocol: /^https?$/,
  hostname: BLOCKED_HOSTNAME_REQ,
  normalize: true
})

function normalizeHost(hostname: string) {
  return hostname.replace(/^\[(.+)\]$/, "$1")
}

export function isClientUrlError(error: unknown) {
  return error instanceof Error && CLIENT_URL_ERRORS.has(error.message)
}

export function assertSafeExternalHttpUrl(input: string) {
  const parsed = externalUrlSchema.safeParse(input)
  if (!parsed.success) throw new Error("INVALID_URL")

  const url = new URL(parsed.data)
  if (url.username || url.password) throw new Error("INVALID_URL")

  const host = normalizeHost(url.hostname)
  if (ipaddr.isValid(host) && ipaddr.process(host).range() !== "unicast") {
    throw new Error("UNSAFE_URL")
  }

  return url
}

export async function fetchTextWithLimit(
  url: URL,
  options: { timeout: number; maxBytes?: number }
) {
  const maxBytes = options.maxBytes ?? MAX_METADATA_BYTES
  const res = await ofetch.raw(url.toString(), {
    redirect: "manual",
    ignoreResponseError: true,
    signal: AbortSignal.timeout(options.timeout),
    headers: {
      "user-agent": "HoldlyMetadataBot/1.0",
      accept: "text/html,application/xhtml+xml"
    }
  })

  if (res.status >= 300 && res.status < 400) throw new Error("REDIRECT_NOT_ALLOWED")
  if (!res.ok || !res.body) throw new Error("FETCH_FAILED")

  const decoder = new TextDecoder()
  let received = 0
  let text = ""

  for await (const chunk of res.body as AsyncIterable<Uint8Array>) {
    received += chunk.byteLength
    if (received > maxBytes) throw new Error("RESPONSE_TOO_LARGE")
    text += decoder.decode(chunk, { stream: true })
  }

  return text + decoder.decode()
}