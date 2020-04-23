const rule = require("../role-has-required-aria-props");
const makeRuleTester = require("./makeRuleTester");

makeRuleTester("role-has-required-aria-props", rule, {
  valid: [
    "<span role='checkbox' aria-checked='false' aria-labelledby='test' tabindex='0' />"
  ],
  invalid: [
    {
      code:
        "<template><span role='checkbox' aria-labelledby='test' tabindex='0' /></template>",
      errors: [{ message: rule.makeMessage("checkbox", "aria-checked") }]
    },
    {
      code:
        "<template><span role='radio' aria-labelledby='test' tabindex='0' /></template>",
      errors: [{ message: rule.makeMessage("radio", "aria-checked") }]
    }
  ]
});
