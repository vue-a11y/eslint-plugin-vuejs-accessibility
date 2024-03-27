import globals from "globals";
import { rules } from "../base";

const recommended = [
  {
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
];

export = recommended;
