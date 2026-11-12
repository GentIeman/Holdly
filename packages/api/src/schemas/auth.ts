import { z } from "zod"

export const loginSchema = z.object({
  identifier: z.email(),
  password: z.string().min(1)
})

export const registerSchema = z.object({
  email: z.email(),
  password: z.string().min(6),
  username: z.string().min(6)
})