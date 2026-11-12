import { defineConfig } from "oxfmt"

export default defineConfig({
  ignorePatterns: ["*.md", "*/skills/"],
  semi: false,
  singleAttributePerLine: true,
  trailingComma: "none",

  insertFinalNewline: false
})