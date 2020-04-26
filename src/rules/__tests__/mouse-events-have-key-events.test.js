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
      code: "<template><div @mouseover='void 0' /></template>",
      errors: [{ message: rule.mouseOverErrorMessage }]
    },
    {
      code: "<template><div @mouseout='void 0' /></template>",
      errors: [{ message: rule.mouseOutErrorMessage }]
    },
    {
      code: "<template><div @mouseover='void 0' @focus='null' /></template>",
      errors: [{ message: rule.mouseOverErrorMessage }]
    },
    {
      code: "<template><div @mouseout='void 0' @blur='null' /></template>",
      errors: [{ message: rule.mouseOutErrorMessage }]
    }
  ]
});
