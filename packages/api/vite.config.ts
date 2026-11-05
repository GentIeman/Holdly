import { defineConfig } from "vite"
import devServer from "@hono/vite-dev-server"
import build from "@hono/vite-build/node"

export default defineConfig({
  server: {
    port: 3001,
    strictPort: true,
    cors: false
  },
  plugins: [
    devServer({
      entry: "src/index.ts"
    }),
    build({
      entry: "src/index.ts",
      port: 3001
    })
  ]
})