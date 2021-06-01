import rule from "../aria-unsupported-elements";
import makeRuleTester from "./makeRuleTester";

makeRuleTester("aria-unsupported-elements", rule, {
  valid: ["<html />"],
  invalid: [
    {
      code: "<meta charset='UTF-8' aria-hidden='false' />",
      errors: [{ messageId: "default", data: { name: "aria-hidden" } }]
    }
  ]
});
