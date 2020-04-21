const rule = require("../no-distracting-elements");
const makeRuleTester = require("./makeRuleTester");

makeRuleTester("no-distracting-elements", rule, {
  valid: [
    {
      filename: "test.vue",
      code: "<template><div></div></template>"
    }
  ],
  invalid: [
    {
      filename: "test.vue",
      code: "<template><blink /></template>",
      errors: [{ message: rule.makeMessage("blink") }]
    },
    {
      filename: "test.vue",
      code: "<template><marquee /></template>",
      errors: [{ message: rule.makeMessage("marquee") }]
    }
  ]
});
