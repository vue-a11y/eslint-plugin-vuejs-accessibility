const rule = require("../src/rules/tabindex-no-positive");
const { RuleTester } = require("eslint");

const message = "Avoid positive integer values for tabIndex.";
const tester = new RuleTester({
  parser: require.resolve("vue-eslint-parser"),
  parserOptions: {
    ecmaVersion: 2015,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true
    }
  }
});

tester.run("tabindex-no-positive", rule, {
  valid: [
    {
      filename: "test.vue",
      code: "<template><span tabindex='0'></span></template>"
    },
    {
      filename: "test.vue",
      code: "<template><span v-if='true' tabindex='0'></span></template>"
    },
    {
      filename: "test.vue",
      code: "<template><span tabindex='-1'></span></template>"
    },
    {
      filename: "test.vue",
      code: "<template><span :tabindex='number'></span></template>"
    }
  ],
  invalid: [
    {
      filename: "test.vue",
      code: "<template><span tabindex='1'></span></template>",
      errors: [{ message }]
    },
    {
      filename: "test.vue",
      code: "<template><span tabindex='2'></span></template>",
      errors: [{ message }]
    },
    {
      filename: "test.vue",
      code: "<template><span :tabindex='2'></span></template>",
      errors: [{ message }]
    }
  ]
});
