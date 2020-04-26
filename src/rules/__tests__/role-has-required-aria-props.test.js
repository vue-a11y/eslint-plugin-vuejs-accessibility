const rule = require("../role-has-required-aria-props");
const makeRuleTester = require("./makeRuleTester");

makeRuleTester("role-has-required-aria-props", rule, {
  valid: [
    "<span role='checkbox' aria-checked='false' aria-labelledby='test' tabindex='0' />"
  ],
  invalid: [
    {
      code: "<span role='checkbox' aria-labelledby='test' tabindex='0' />",
      errors: [{ message: rule.makeMessage("checkbox", "aria-checked") }]
    },
    {
      code: "<span role='radio' aria-labelledby='test' tabindex='0' />",
      errors: [{ message: rule.makeMessage("radio", "aria-checked") }]
    }
  ]
});
