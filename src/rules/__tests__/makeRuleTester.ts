import type { Rule } from "eslint";
import { RuleTester } from "eslint";

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
  const ruleTester = new RuleTester({
    parser: require.resolve("vue-eslint-parser"),
    parserOptions: {
      ecmaVersion: 2015,
      sourceType: "module"
    }
  });

  ruleTester.run(name, rule, {
    valid: config.valid.map(makeValidExample),
    invalid: config.invalid.map(makeInvalidExample)
  });
}

export default makeRuleTester;
