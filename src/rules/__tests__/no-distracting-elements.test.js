const rule = require("../no-distracting-elements");
const makeRuleTester = require("./makeRuleTester");

makeRuleTester("no-distracting-elements", rule, {
  valid: ["<div />"],
  invalid: [
    {
      code: "<template><blink /></template>",
      errors: [{ message: rule.makeMessage("blink") }]
    },
    {
      code: "<template><marquee /></template>",
      errors: [{ message: rule.makeMessage("marquee") }]
    }
  ]
});
