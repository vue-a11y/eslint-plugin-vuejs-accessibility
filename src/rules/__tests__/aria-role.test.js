const rule = require("../aria-role");
const makeRuleTester = require("./makeRuleTester");

makeRuleTester("aria-role", rule, {
  valid: [
    "<div role='button' />",
    "<div :role='role' />",
    "<div />",
    {
      code: "<template><Foo role='test' /></template>",
      options: [{ ignoreNonDOM: true }]
    }
  ],
  invalid: ["<div role='datepicker' />", "<div role='' />"]
});
