const rule = require("../aria-props");
const makeRuleTester = require("./makeRuleTester");

makeRuleTester("aria-props", rule, {
  valid: ["<input aria-labelledby='address' />"],
  invalid: [
    {
      code: '<template><input aria-test="address"></template>',
      errors: [{ message: rule.makeMessage("aria-test") }]
    }
  ]
});
