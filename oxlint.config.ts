import { defineConfig } from "oxlint"

export default defineConfig({
  plugins: ["typescript", "import", "promise", "unicorn", "oxc"],
  categories: {
    correctness: "error",
    suspicious: "warn",
    perf: "warn",
    pedantic: "off",
    style: "off"
  },
  rules: {
    "no-console": "warn",
    eqeqeq: "error",
    "no-underscore-dangle": ["warn", { allow: ["_data"] }],

    "typescript/no-explicit-any": "warn",
    "typescript/no-non-null-assertion": "warn",

    "import/no-duplicates": "error",
    "import/no-cycle": "warn",
    "import/no-unassigned-import": [
      "error",
      {
        allow: ["**/*.css"]
      }
    ],

    "promise/no-return-wrap": "error"
  },
  ignorePatterns: ["dist", "node_modules"]
})