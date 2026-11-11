import { z } from "zod"

export const BLOCKED_HOSTNAME =
  /^(?!localhost(?:\.|$))(?!.*\.(?:localhost|local|internal)(?:\.|$)).+$/i

export const externalUrlSchema = z.url({
  protocol: /^https?$/,
  hostname: BLOCKED_HOSTNAME,
  normalize: true
})