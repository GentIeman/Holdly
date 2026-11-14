import { lookup } from "node:dns/promises"
import ipaddr from "ipaddr.js"

import { externalUrlSchema } from "../schemas/externalUrl"

const MAX_METADATA_BYTES = 512 * 1024 // 512 KB

type SafeFetchErrorCode =
  | "INVALID_URL"
  | "UNSAFE_URL"
  | "REDIRECT_NOT_ALLOWED"
  | "RESPONSE_TOO_LARGE"
  | "FETCH_FAILED"

const CLIENT_ERRORS = {
  INVALID_URL: true,
  UNSAFE_URL: true,
  REDIRECT_NOT_ALLOWED: true,
  RESPONSE_TOO_LARGE: true,
  FETCH_FAILED: false
} satisfies Record<SafeFetchErrorCode, boolean>

export class SafeFetchError extends Error {
  constructor(readonly code: SafeFetchErrorCode) {
    super(code)
    this.name = "SafeFetchError"
  }
}

// Checks whether the error is a client-side URL/fetch error
export function isClientUrlError(error: unknown) {
  return error instanceof SafeFetchError && CLIENT_ERRORS[error.code]
}

// Removes brackets from an IPv6 hostname for ipaddr
function normalizeHost(hostname: string) {
  return hostname.replace(/^\[(.+)]$/, "$1")
}

// Ensures an IP address is in a safe range
function assertSafeIp(address: string) {
  const addr = ipaddr.process(address)

  // TODO: add IPv6 support in the future (including scoped/link-local cases)
  if (addr.kind() === "ipv6" || addr.range() !== "unicast") {
    throw new SafeFetchError("UNSAFE_URL")
  }
}

// Ensures a host is a safe IP literal or resolves only to safe addresses
async function assertSafeHost(hostname: string) {
  const host = normalizeHost(hostname)

  if (ipaddr.isValid(host)) {
    assertSafeIp(host)
    return
  }

  const records = await lookup(host, { all: true }).catch(() => {
    // Treat DNS resolution failures as unsafe
    throw new SafeFetchError("UNSAFE_URL")
  })

  for (const record of records) assertSafeIp(record.address)
}

// Validates the URL and ensures it is safe for external requests
export async function assertSafeExternalHttpUrl(input: string) {
  const parsed = externalUrlSchema.safeParse(input)
  if (!parsed.success) throw new SafeFetchError("INVALID_URL")

  const url = new URL(parsed.data)

  await assertSafeHost(url.hostname)

  return url
}

// Checks the response and reads its body up to the size limit
export async function readHtml(res: Response) {
  // Block redirects to avoid following them to internal addresses
  if (res.status >= 300 && res.status < 400) throw new SafeFetchError("REDIRECT_NOT_ALLOWED")
  if (!res.ok) throw new SafeFetchError("FETCH_FAILED")

  // Accept only HTML responses
  const contentType = res.headers.get("content-type")?.toLowerCase() ?? ""
  if (contentType && !contentType.includes("text/html") && !contentType.includes("xhtml")) {
    throw new SafeFetchError("FETCH_FAILED")
  }

  const body = res.body
  if (!body) return ""

  const decoder = new TextDecoder()
  let received = 0
  let text = ""

  // Read the body as a stream and enforce the size limit
  for await (const chunk of body) {
    received += chunk.byteLength
    if (received > MAX_METADATA_BYTES) throw new SafeFetchError("RESPONSE_TOO_LARGE")

    text += decoder.decode(chunk, { stream: true })

    // Metadata is usually in head so stop early when it closes
    if (/<\/head\s*>/i.test(text)) break
  }

  return text + decoder.decode()
}