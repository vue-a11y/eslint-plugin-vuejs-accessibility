module.exports = {
  rules: {
    "accessible-emoji": require("./rules/accessible-emoji"),
    "alt-text": require("./rules/alt-text"),
    "anchor-has-content": require("./rules/anchor-has-content"),
    "aria-props": require("./rules/aria-props"),
    "aria-role": require("./rules/aria-role"),
    "aria-unsupported-elements": require("./rules/aria-unsupported-elements"),
    "click-events-have-key-events": require("./rules/click-events-have-key-events"),
    "form-control-has-label": require("./rules/form-control-has-label"),
    "heading-has-content": require("./rules/heading-has-content"),
    "iframe-has-title": require("./rules/iframe-has-title"),
    "interactive-supports-focus": require("./rules/interactive-supports-focus"),
    "media-has-caption": require("./rules/media-has-caption"),
    "mouse-events-have-key-events": require("./rules/mouse-events-have-key-events"),
    "no-access-key": require("./rules/no-access-key"),
    "no-autofocus": require("./rules/no-autofocus"),
    "no-distracting-elements": require("./rules/no-distracting-elements"),
    "no-onchange": require("./rules/no-onchange"),
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
        "vue-accessibility/accessible-emoji": "error",
        "vue-accessibility/alt-text": "error",
        "vue-accessibility/anchor-has-content": "error",
        "vue-accessibility/aria-props": "error",
        "vue-accessibility/aria-role": "error",
        "vue-accessibility/aria-unsupported-elements": "error",
        "vue-accessibility/click-events-have-key-events": "error",
        "vue-accessibility/form-control-has-label": "error",
        "vue-accessibility/heading-has-content": "error",
        "vue-accessibility/iframe-has-title": "error",
        "vue-accessibility/interactive-supports-focus": [
          "error",
          {
            tabbable: [
              "button",
              "checkbox",
              "link",
              "searchbox",
              "spinbutton",
              "switch",
              "textbox"
            ]
          }
        ],
        "vue-accessibility/media-has-caption": "error",
        "vue-accessibility/mouse-events-have-key-events": "error",
        "vue-accessibility/no-access-key": "error",
        "vue-accessibility/no-autofocus": "error",
        "vue-accessibility/no-distracting-elements": "error",
        "vue-accessibility/no-onchange": "error",
        "vue-accessibility/no-redundant-roles": "error",
        "vue-accessibility/role-has-required-aria-props": "error",
        "vue-accessibility/tabindex-no-positive": "error"
      }
    }
  }
};
