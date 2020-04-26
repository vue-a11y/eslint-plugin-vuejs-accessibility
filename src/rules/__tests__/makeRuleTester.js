const { RuleTester } = require("eslint");

const filename = "test.vue";
const makeTemplate = (code) => `<template>${code}</template>`;

const makeValidExample = (example) => {
  if (typeof example === "string") {
    return { filename, code: makeTemplate(example) };
  }

  return Object.assign(example, { filename });
};

const makeInvalidExample = (rule) => (example) => {
  if (typeof example === "string") {
    return {
      filename,
      code: makeTemplate(example),
      errors: [{ message: rule.message }]
    };
  }

  return Object.assign(example, { filename, code: makeTemplate(example.code) });
};

module.exports = (name, rule, config) => {
  const ruleTester = new RuleTester({
    parser: require.resolve("vue-eslint-parser"),
    parserOptions: {
      ecmaVersion: 2015,
      sourceType: "module",
      ecmaFeatures: {
        jsx: true
      }
    }
  });

  ruleTester.run(name, rule, {
    valid: config.valid.map(makeValidExample),
    invalid: config.invalid.map(makeInvalidExample(rule))
  });
};
