import dns from "node:dns/promises"
import ipaddr from "ipaddr.js"
import { ofetch } from "ofetch"

import { externalUrlSchema } from "../schemas/externalUrl"

const MAX_METADATA_BYTES = 512 * 1024 // 512 KB

type SafeFetchErrorCode =
  | "INVALID_URL"
  | "UNSAFE_URL"
  | "REDIRECT_NOT_ALLOWED"
  | "RESPONSE_TOO_LARGE"
  | "FETCH_FAILED"

const CLIENT_ERROR_CODES = new Set<SafeFetchErrorCode>([
  "INVALID_URL",
  "UNSAFE_URL",
  "REDIRECT_NOT_ALLOWED",
  "RESPONSE_TOO_LARGE"
])

export class SafeFetchError extends Error {
  code: SafeFetchErrorCode

  constructor(code: SafeFetchErrorCode) {
    super(code)
    this.name = "SafeFetchError"
    this.code = code
  }
}

// Checks whether the error is a client-side URL/fetch error
export function isClientUrlError(error: unknown) {
  return error instanceof SafeFetchError && CLIENT_ERROR_CODES.has(error.code)
}

// Removes brackets from an IPv6 hostname for ipaddr
function normalizeHost(hostname: string) {
  return hostname.replace(/^\[(.+)]$/, "$1")
}

// Ensures a literal IP host is not in an unsafe range
function assertSafeHost(hostname: string) {
  const host = normalizeHost(hostname)

  if (!ipaddr.isValid(host)) return

  const addr = ipaddr.process(host)

  // TODO: add IPv6 support in the future (including scoped/link-local cases)
  if (addr.kind() === "ipv6") throw new SafeFetchError("UNSAFE_URL")
  if (addr.range() !== "unicast") throw new SafeFetchError("UNSAFE_URL")
}

// Ensures a domain name resolves only to safe addresses
async function assertSafeResolvedHost(hostname: string) {
  const host = normalizeHost(hostname)
  if (ipaddr.isValid(host)) return

  const records = await dns.lookup(host, { all: true, order: "verbatim" })
  if (records.length === 0) throw new SafeFetchError("UNSAFE_URL")

  for (const record of records) {
    const addr = ipaddr.process(record.address)

    // TODO: add IPv6 support in the future (including scoped/link-local cases)
    if (addr.kind() === "ipv6") throw new SafeFetchError("UNSAFE_URL")
    if (addr.range() !== "unicast") throw new SafeFetchError("UNSAFE_URL")
  }
}

// Validates the URL and ensures it is safe for external requests
export async function assertSafeExternalHttpUrl(input: string) {
  const parsed = externalUrlSchema.safeParse(input)
  if (!parsed.success) throw new SafeFetchError("INVALID_URL")

  const url = new URL(parsed.data)
  if (url.username || url.password) throw new SafeFetchError("INVALID_URL")

  assertSafeHost(url.hostname)

  try {
    await assertSafeResolvedHost(url.hostname)
  } catch (error) {
    if (error instanceof SafeFetchError) throw error
    // Treat DNS resolution failures as unsafe for metadata fetching
    throw new SafeFetchError("UNSAFE_URL")
  }

  return url
}

// Fetches page text with size limits and safety checks
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

  // Block redirects to avoid following them to internal addresses
  if (res.status >= 300 && res.status < 400) throw new SafeFetchError("REDIRECT_NOT_ALLOWED")
  if (!res.ok) throw new SafeFetchError("FETCH_FAILED")

  const contentType = res.headers.get("content-type")?.toLowerCase() ?? ""
  if (contentType && !contentType.includes("text/html") && !contentType.includes("xhtml")) {
    throw new SafeFetchError("FETCH_FAILED")
  }

  // Quick size check when Content-Length is provided
  const contentLength = Number(res.headers.get("content-length"))
  if (Number.isFinite(contentLength) && contentLength > maxBytes) {
    throw new SafeFetchError("RESPONSE_TOO_LARGE")
  }

  if (!res.body) return ""

  const decoder = new TextDecoder()
  let received = 0
  let text = ""

  // Read the body as a stream and enforce the size limit
  for await (const chunk of res.body as AsyncIterable<Uint8Array>) {
    received += chunk.byteLength
    if (received > maxBytes) throw new SafeFetchError("RESPONSE_TOO_LARGE")

    text += decoder.decode(chunk, { stream: true })

    // Metadata is usually in head so stop early when it closes
    if (/<\/head\s*>/i.test(text)) break
  }

  return text + decoder.decode()
}