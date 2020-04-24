const rule = require("../aria-unsupported-elements");
const makeRuleTester = require("./makeRuleTester");

makeRuleTester("aria-unsupported-elements", rule, {
  valid: ["<html />"],
  invalid: [
    {
      code: "<template><meta charset='UTF-8' aria-hidden='false' /></template>",
      errors: [{ message: rule.makeMessage("aria-hidden") }]
    }
  ]
});
