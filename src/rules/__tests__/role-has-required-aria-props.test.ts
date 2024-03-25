import rule from "../role-has-required-aria-props";
import makeRuleTester from "./makeRuleTester";

makeRuleTester("role-has-required-aria-props", rule, {
  valid: [
    "<input role='switch' type='checkbox' aria-labelledby='test' />",
    "<span role='checkbox' aria-checked='false' aria-labelledby='test' tabindex='0' />",
    "<span :role='role' aria-checked='false' aria-labelledby='test' tabindex='0' />",
    "<span :role='role' />"
  ],
  invalid: [
    {
      code: "<input role='switch' aria-labelledby='test' />",
      errors: [
        {
          messageId: "default",
          data: { role: "switch", attributes: "aria-checked" }
        }
      ]
    },
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
