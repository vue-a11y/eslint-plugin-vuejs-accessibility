module.exports = {
  rules: {
    "iframe-has-title": require("./rules/iframe-has-title"),
    "no-access-key": require("./rules/no-access-key"),
    "no-autofocus": require("./rules/no-autofocus"),
    "no-distracting-elements": require("./rules/no-distracting-elements"),
    "tabindex-no-positive": require("./rules/tabindex-no-positive")
  },
  configs: {
    recommended: {
      parser: require.resolve("vue-eslint-parser"),
      plugins: ["vue-accessibility"],
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      },
      rules: {
        "vue-accessibility/iframe-has-title": "error",
        "vue-accessibility/no-access-key": "error",
        "vue-accessibility/no-autofocus": "error",
        "vue-accessibility/no-distracting-elements": "error",
        "vue-accessibility/tabindex-no-positive": "error"
      }
    }
  }
};
