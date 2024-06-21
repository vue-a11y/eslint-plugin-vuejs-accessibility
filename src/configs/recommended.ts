import type { Linter } from "eslint";
import { rules } from "./rules";

const recommended = {
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
  rules
} satisfies Linter.BaseConfig;

export default recommended;
