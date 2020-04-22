const { RuleTester } = require("eslint");

const filename = "test.vue";

const makeValidExample = (example) => {
  if (typeof example === "string") {
    return { filename, code: `<template>${example}</template>` };
  }

  return Object.assign(example, { filename });
};

const makeInvalidExample = (rule) => (example) => {
  if (typeof example === "string") {
    return Object.assign(makeValidExample(example), {
      errors: [{ message: rule.message }]
    });
  }

  return Object.assign(example, { filename });
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
