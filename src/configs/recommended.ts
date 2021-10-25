import type { Linter } from "eslint";

const recommended: Linter.BaseConfig = {
  parser: require.resolve("vue-eslint-parser"),
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module"
  },
  env: {
    browser: true,
    es6: true
  },
  plugins: ["vuejs-accessibility"],
  rules: {
    "vuejs-accessibility/alt-text": "error",
    "vuejs-accessibility/anchor-has-content": "error",
    "vuejs-accessibility/aria-props": "error",
    "vuejs-accessibility/aria-role": "error",
    "vuejs-accessibility/aria-unsupported-elements": "error",
    "vuejs-accessibility/click-events-have-key-events": "error",
    "vuejs-accessibility/form-control-has-label": "error",
    "vuejs-accessibility/heading-has-content": "error",
    "vuejs-accessibility/iframe-has-title": "error",
    "vuejs-accessibility/interactive-supports-focus": "error",
    "vuejs-accessibility/label-has-for": "error",
    "vuejs-accessibility/media-has-caption": "error",
    "vuejs-accessibility/mouse-events-have-key-events": "error",
    "vuejs-accessibility/no-access-key": "error",
    "vuejs-accessibility/no-autofocus": "error",
    "vuejs-accessibility/no-distracting-elements": "error",
    "vuejs-accessibility/no-onchange": "error",
    "vuejs-accessibility/no-redundant-roles": "error",
    "vuejs-accessibility/role-has-required-aria-props": "error",
    "vuejs-accessibility/tabindex-no-positive": "error"
  }
};

export default recommended;
