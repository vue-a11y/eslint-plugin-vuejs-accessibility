const rule = require("../iframe-has-title");
const makeRuleTester = require("./makeRuleTester");

makeRuleTester("iframe-has-title", rule, {
  valid: [
    {
      filename: "test.vue",
      code: '<template><iframe title="maran"></iframe></template>'
    },
    {
      filename: "test.vue",
      code: '<template><iframe :title="msg"></iframe></template>'
    }
  ],
  invalid: [
    {
      filename: "test.vue",
      code: '<template><iframe :title="true"></iframe></template>',
      errors: [{ message: rule.message }]
    },
    {
      filename: "test.vue",
      code: '<template><iframe :title="2"></iframe></template>',
      errors: [{ message: rule.message }]
    }
  ]
});
