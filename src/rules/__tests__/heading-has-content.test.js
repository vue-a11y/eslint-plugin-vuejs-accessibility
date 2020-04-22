const rule = require("../heading-has-content");
const makeRuleTester = require("./makeRuleTester");

makeRuleTester("heading-has-content", rule, {
  valid: [
    {
      filename: "test.vue",
      code: "<template><h1>test</h1></template>"
    },
    {
      filename: "test.vue",
      code: "<template><h1><span>test</span></h1></template>"
    },
    {
      filename: "test.vue",
      code: "<template><h1 v-text='msg'></h1></template>"
    },
    {
      filename: "test.vue",
      code: "<template><h1 v-html='msg'></h1></template>"
    },
    {
      filename: "test.vue",
      code: "<template><h1>{{ test }}</h1></template>"
    }
  ],
  invalid: [
    {
      filename: "test.vue",
      code: "<template><h1 /></template>",
      errors: [{ message: rule.message }]
    },
    {
      filename: "test.vue",
      code: "<template><h1><span /></h1></template>",
      errors: [{ message: rule.message }]
    },
    {
      filename: "test.vue",
      code:
        "<template><h1><span aria-hidden='true'>test</span></h1></template>",
      errors: [{ message: rule.message }]
    },
    {
      filename: "test.vue",
      code: "<template><h1>   </h1></template>",
      errors: [{ message: rule.message }]
    }
  ]
});
