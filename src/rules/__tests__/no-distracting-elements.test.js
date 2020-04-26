const rule = require("../no-distracting-elements");
const makeRuleTester = require("./makeRuleTester");

makeRuleTester("no-distracting-elements", rule, {
  valid: ["<div />"],
  invalid: [
    {
      code: "<blink />",
      errors: [{ message: rule.makeMessage("blink") }]
    },
    {
      code: "<marquee />",
      errors: [{ message: rule.makeMessage("marquee") }]
    }
  ]
});
