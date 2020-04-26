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
      errors: [{ message: rule.mouseOverErrorMessage }]
    },
    {
      code: "<div @mouseout='void 0' />",
      errors: [{ message: rule.mouseOutErrorMessage }]
    },
    {
      code: "<div @mouseover='void 0' @focus='null' />",
      errors: [{ message: rule.mouseOverErrorMessage }]
    },
    {
      code: "<div @mouseout='void 0' @blur='null' />",
      errors: [{ message: rule.mouseOutErrorMessage }]
    }
  ]
});
