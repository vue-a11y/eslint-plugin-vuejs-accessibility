const rule = require("../no-access-key");
const makeRuleTester = require("./makeRuleTester");

makeRuleTester("no-access-key", rule, {
  valid: [
    {
      filename: "test.vue",
      code: "<template><div></div></template>"
    },
    {
      filename: "test.vue",
      code: "<template><div accesskey></div></template>"
    }
  ],
  invalid: [
    {
      filename: "test.vue",
      code: '<template><div accesskey="h"></div></template>',
      errors: [
        {
          message: rule.message
        }
      ]
    },
    {
      filename: "test.vue",
      code: '<template><div :accesskey="h"></div></template>',
      errors: [
        {
          message: rule.message
        }
      ]
    }
  ]
});
