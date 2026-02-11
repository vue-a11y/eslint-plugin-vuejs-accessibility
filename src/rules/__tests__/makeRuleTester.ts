import type { Rule, Linter } from "eslint";
import { RuleTester } from "eslint";
import { version as eslintVersion } from "eslint/package.json";
import * as semver from "semver";

const usingFlatConfig = semver.major(eslintVersion) >= 9;

type ValidCase = string | { code: string; options?: any[] };
type InvalidCase = string | { code: string; options?: any[]; errors: any[] };
type Config = { valid: ValidCase[]; invalid: InvalidCase[] };

const filename = "test.vue";
const makeTemplate = (code: string) => `<template>${code}</template>`;

function makeValidExample(example: ValidCase) {
  if (typeof example === "string") {
    return { filename, code: makeTemplate(example) };
  }

  return { ...example, filename, code: makeTemplate(example.code) };
}

function makeInvalidExample(example: InvalidCase) {
  if (typeof example === "string") {
    return {
      filename,
      code: makeTemplate(example),
      errors: [{ messageId: "default" }]
    };
  }

  return { ...example, filename, code: makeTemplate(example.code) };
}

function makeRuleTester(name: string, rule: Rule.RuleModule, config: Config) {
  // todo: cean this up once we only support ESLint v8/9
  let theConfig = {
    parser: require.resolve("vue-eslint-parser"),
    parserOptions: {
      ecmaVersion: 2015,
      sourceType: "module"
    } as const
  };

  if (usingFlatConfig) {
    theConfig = {
      // @ts-expect-error
      languageOptions: {
        parser: require("vue-eslint-parser"),
        parserOptions: theConfig.parserOptions
      }
    } satisfies Linter.FlatConfig;
  }

  // the types here will be correct on older versions of eslint
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const ruleTester = new RuleTester(theConfig);

  ruleTester.run(name, rule, {
    valid: config.valid.map(makeValidExample),
    invalid: config.invalid.map(makeInvalidExample)
  });
}

export default makeRuleTester;
