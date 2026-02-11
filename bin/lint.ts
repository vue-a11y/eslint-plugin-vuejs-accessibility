#!./node_modules/.bin/ts-node

import { ESLint } from "eslint";
import a11yPlugin from "../src";

(async function main() {
  const eslint = new ESLint({
    // @ts-ignore this only supports ESLint <v8 for now
    baseConfig: a11yPlugin.configs.recommended,
    plugins: { "eslint-plugin-vuejs-accessibility": a11yPlugin },
    useEslintrc: false
  });

  const results = await eslint.lintFiles(process.argv.slice(2));
  const formatter = await eslint.loadFormatter("stylish");

  const resultText = formatter.format(results);
  console.log(resultText);
})().catch((error) => {
  process.exitCode = 1;
  console.error(error);
});
