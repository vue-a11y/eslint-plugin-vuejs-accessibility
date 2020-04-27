const rule = require("../mouse-events-have-key-events");
const makeRuleTester = require("./makeRuleTester");

makeRuleTester("mouse-events-have-key-events", rule, {
  valid: [
    "<div />",
    "<div @mouseover='void 0' @focus='void 0' />",
    "<div @mouseout='void 0' @blur='void 0' />"
  ],
  invalid: [
    {
      code: "<div @mouseover='void 0' />",
      errors: [{ messageId: "mouseOver" }]
    },
    {
      code: "<div @mouseout='void 0' />",
      errors: [{ messageId: "mouseOut" }]
    },
    {
      code: "<div @mouseover='void 0' @focus='null' />",
      errors: [{ messageId: "mouseOver" }]
    },
    {
      code: "<div @mouseout='void 0' @blur='null' />",
      errors: [{ messageId: "mouseOut" }]
    }
  ]
});
