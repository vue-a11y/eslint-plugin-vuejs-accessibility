module.exports = {
  rules: {
    "anchor-has-content": require("./rules/anchor-has-content"),
    "aria-props": require("./rules/aria-props"),
    "aria-role": require("./rules/aria-role"),
    "heading-has-content": require("./rules/heading-has-content"),
    "iframe-has-title": require("./rules/iframe-has-title"),
    "no-access-key": require("./rules/no-access-key"),
    "no-autofocus": require("./rules/no-autofocus"),
    "no-distracting-elements": require("./rules/no-distracting-elements"),
    "no-redundant-roles": require("./rules/no-redundant-roles"),
    "role-has-required-aria-props": require("./rules/role-has-required-aria-props"),
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
        "vue-accessibility/anchor-has-content": "error",
        "vue-accessibility/aria-props": "error",
        "vue-accessibility/aria-role": "error",
        "vue-accessibility/heading-has-content": "error",
        "vue-accessibility/iframe-has-title": "error",
        "vue-accessibility/no-access-key": "error",
        "vue-accessibility/no-autofocus": "error",
        "vue-accessibility/no-distracting-elements": "error",
        "vue-accessibility/no-redundant-roles": "error",
        "vue-accessibility/role-has-required-aria-props": "error",
        "vue-accessibility/tabindex-no-positive": "error"
      }
    }
  }
};
