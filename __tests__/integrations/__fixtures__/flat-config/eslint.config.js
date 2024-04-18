import plugin from "eslint-plugin-vuejs-accessibility";

export default [
  ...plugin.configs["flat/recommended"],
  {
    rules: {
      "vuejs-accessibility/alt-text": "warn"
    }
  }
];
