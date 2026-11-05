import { Hono } from "hono"
import { cors } from "hono/cors"
import { logger } from "hono/logger"
import auth from "./routes/auth"
import bookmarks from "./routes/bookmarks"

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

export default app