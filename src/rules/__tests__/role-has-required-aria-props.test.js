const rule = require("../role-has-required-aria-props");
const makeRuleTester = require("./makeRuleTester");

makeRuleTester("role-has-required-aria-props", rule, {
  valid: [
    "<span role='checkbox' aria-checked='false' aria-labelledby='test' tabindex='0' />",
    "<span :role='varHere' aria-checked='false' aria-labelledby='test' tabindex='0' />",
    "<span :role='varHere' />"
  ],
  invalid: [
    {
      code: "<span role='checkbox' aria-labelledby='test' tabindex='0' />",
      errors: [
        {
          messageId: "default",
          data: { role: "checkbox", attributes: "aria-checked" }
        }
      ]
    },
    {
      code: "<span role='radio' aria-labelledby='test' tabindex='0' />",
      errors: [
        {
          messageId: "default",
          data: { role: "radio", attributes: "aria-checked" }
        }
      ]
    }
  ]
});
