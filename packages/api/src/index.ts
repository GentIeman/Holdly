import { Hono } from "hono"
import { cors } from "hono/cors"
import { logger } from "hono/logger"
import { HTTPException } from "hono/http-exception"
import auth from "./routes/auth"
import bookmarks from "./routes/bookmarks"
import { httpError } from "./utils/errors"

const app = new Hono()

app.use(
  "*",
  logger(),
  cors({
    origin: [import.meta.env.VITE_FRONTEND_ORIGIN || "http://localhost:3000"],
    credentials: true
  })
)

app.route("/api", auth)
app.route("/api", bookmarks)

app.notFound((ctx) => httpError(ctx, 404, "NOT_FOUND", "Not found"))

app.onError((error, ctx) => {
  if (error instanceof HTTPException && error.status === 400) {
    return httpError(ctx, 400, "VALIDATION_ERROR", "Invalid request")
  }

  console.error(error)
  return httpError(ctx, 500, "INTERNAL_ERROR", "Internal server error")
})

export default app
