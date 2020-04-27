const rule = require("../aria-unsupported-elements");
const makeRuleTester = require("./makeRuleTester");

makeRuleTester("aria-unsupported-elements", rule, {
  valid: ["<html />"],
  invalid: [
    {
      code: "<meta charset='UTF-8' aria-hidden='false' />",
      errors: [{ messageId: "default", data: { name: "aria-hidden" } }]
    }
  ]
});
