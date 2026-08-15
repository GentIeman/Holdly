import withNuxt from "./.nuxt/eslint.config.mjs"

export default withNuxt({
  files: ["**/*.vue"],
  rules: {
    "vue/attributes-order": [
      "error",
      {
        order: [
          "DEFINITION",
          "LIST_RENDERING",
          "CONDITIONALS",
          "RENDER_MODIFIERS",
          "GLOBAL",
          ["UNIQUE", "SLOT"],
          "TWO_WAY_BINDING",
          "OTHER_DIRECTIVES",
          "OTHER_ATTR",
          "EVENTS",
          "CONTENT"
        ],
        alphabetical: false
      }
    ],
    "vue/require-default-prop": "off",
    "vue/html-self-closing": [
      "error",
      {
        html: {
          void: "always"
        }
      }
    ]
  }
})