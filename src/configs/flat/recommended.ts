import type { Linter, ESLint } from "eslint";
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
      // todo: this can be removed once we are building w/ a newer version of globals
      globals: globals.browser as ESLint.Environment["globals"]
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
      // todo: this can be removed once we are building w/ a newer version of globals
      globals: globals.browser as ESLint.Environment["globals"]
    },
    rules
  }
] satisfies Linter.FlatConfig[];

export = recommended;
