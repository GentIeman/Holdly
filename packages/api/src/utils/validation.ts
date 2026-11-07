import { zValidator } from "@hono/zod-validator"
import type { ValidationTargets } from "hono"
import type { ZodType } from "zod"

import { httpError } from "./errors"

export function validate<T extends ZodType, Target extends keyof ValidationTargets>(
  target: Target,
  schema: T
) {
  return zValidator(target, schema, (result, ctx) => {
    if (result.success) return

    return httpError(
      ctx,
      400,
      "VALIDATION_ERROR",
      "Invalid request",
      result.error.issues.map((issue) => ({
        path: issue.path.map(String).join("."),
        message: issue.message
      }))
    )
  })
}