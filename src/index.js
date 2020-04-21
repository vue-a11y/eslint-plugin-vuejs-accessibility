module.exports = {
  rules: {
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
        "vue-accessibility/no-distracting-elements": "error",
        "vue-accessibility/tabindex-no-positive": "error"
      }
    }
  }
};
