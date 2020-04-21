const rule = require("../no-autofocus");
const makeRuleTester = require("./makeRuleTester");

makeRuleTester("no-autofocus", rule, {
  valid: [
    {
      filename: "test.vue",
      code: "<template><div /></template>"
    },
    {
      filename: "test.vue",
      code: "<template><Anchor autofocus='autofocus' /></template>",
      options: [{ ignoreNonDOM: true }]
    }
  ],
  invalid: [
    {
      filename: "test.vue",
      code: "<template><div autofocus /></template>",
      errors: [
        {
          message: rule.message
        }
      ]
    },
    {
      filename: "test.vue",
      code: "<template><div autofocus='true' /></template>",
      errors: [
        {
          message: rule.message
        }
      ]
    },
    {
      filename: "test.vue",
      code: "<template><div :autofocus='sth' /></template>",
      errors: [
        {
          message: rule.message
        }
      ]
    }
  ]
});
