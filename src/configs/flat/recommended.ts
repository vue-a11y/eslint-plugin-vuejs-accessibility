import type { Linter } from "eslint";
import globals from "globals";
import { rules } from "../rules";

const recommended = [
  {
    name: "vuejs-accessibility:setup:base",
    plugins: {
      get "vuejs-accessibility"() {
        return require("../../index");
      }
    },
    languageOptions: {
      sourceType: "module",
      globals: globals.browser
    }
  },
  {
    name: "vuejs-accessibility:setup:with-files-rules-and-parser",
    files: ["*.vue", "**/*.vue"],
    plugins: {
      get "vuejs-accessibility"() {
        return require("../../index");
      }
    },
    languageOptions: {
      parser: require("vue-eslint-parser"),
      sourceType: "module",
      globals: globals.browser
    },
    rules
  }
] as const satisfies Linter.FlatConfig[];

export = recommended;
