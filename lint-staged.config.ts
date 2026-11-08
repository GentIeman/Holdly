import { defineConfig } from "lint-staged/config"

export default defineConfig({
  "*.{ts,vue}": ["oxfmt --write", "oxlint"],
  "*.{json,css,html}": "oxfmt --write"
})