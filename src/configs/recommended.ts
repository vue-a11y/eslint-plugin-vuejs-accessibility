import type { Linter } from "eslint";
import { rules } from "./base";

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
  rules
};

export default recommended;
