import rule from "../aria-props";
import makeRuleTester from "./makeRuleTester";

makeRuleTester("aria-props", rule, {
  valid: ["<input aria-labelledby='address' />"],
  invalid: [
    {
      code: "<input aria-test='address' />",
      errors: [{ messageId: "default", data: { name: "aria-test" } }]
    }
  ]
});
