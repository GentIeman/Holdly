import 'dotenv/config'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { logger } from 'hono/logger'
import { serve } from '@hono/node-server'
import auth from './routes/auth'
import bookmarks from './routes/bookmarks'

const app = new Hono()

app.use('*', logger())
app.use('*', cors({
  origin: ['http://localhost:3000'],
  credentials: true,
}))

app.route('/api', auth)
app.route('/api', bookmarks)

const port = Number(process.env.API_PORT)

serve({ fetch: app.fetch, port }, (info) => {
  console.log(`Hono API server running on http://localhost:${info.port}`)
})
