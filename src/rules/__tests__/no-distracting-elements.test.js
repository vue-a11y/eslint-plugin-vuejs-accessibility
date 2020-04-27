const rule = require("../no-distracting-elements");
const makeRuleTester = require("./makeRuleTester");

makeRuleTester("no-distracting-elements", rule, {
  valid: ["<div />"],
  invalid: [
    {
      code: "<blink />",
      errors: [{ messageId: "default", data: { elementType: "blink" } }]
    },
    {
      code: "<marquee />",
      errors: [{ messageId: "default", data: { elementType: "marquee" } }]
    }
  ]
});
