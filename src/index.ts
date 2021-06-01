export default {
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
    "label-has-for": require("./rules/label-has-for"),
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
      plugins: ["vuejs-accessibility"],
      rules: {
        "vuejs-accessibility/accessible-emoji": "error",
        "vuejs-accessibility/alt-text": "error",
        "vuejs-accessibility/anchor-has-content": "error",
        "vuejs-accessibility/aria-props": "error",
        "vuejs-accessibility/aria-role": [
          "error",
          {
            ignoreNonDOM: true
          }
        ],
        "vuejs-accessibility/aria-unsupported-elements": "error",
        "vuejs-accessibility/click-events-have-key-events": "error",
        "vuejs-accessibility/form-control-has-label": "error",
        "vuejs-accessibility/heading-has-content": "error",
        "vuejs-accessibility/iframe-has-title": "error",
        "vuejs-accessibility/interactive-supports-focus": [
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
        "vuejs-accessibility/label-has-for": "error",
        "vuejs-accessibility/media-has-caption": "error",
        "vuejs-accessibility/mouse-events-have-key-events": "error",
        "vuejs-accessibility/no-access-key": "error",
        "vuejs-accessibility/no-autofocus": [
          "error",
          {
            ignoreNonDOM: true
          }
        ],
        "vuejs-accessibility/no-distracting-elements": "error",
        "vuejs-accessibility/no-onchange": "error",
        "vuejs-accessibility/no-redundant-roles": "error",
        "vuejs-accessibility/role-has-required-aria-props": "error",
        "vuejs-accessibility/tabindex-no-positive": "error"
      }
    }
  }
};
