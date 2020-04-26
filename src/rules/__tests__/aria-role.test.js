const rule = require("../aria-role");
const makeRuleTester = require("./makeRuleTester");

makeRuleTester("aria-role", rule, {
  valid: [
    "<div role='button' />",
    "<div :role='role' />",
    "<div />",
    {
      code: "<Foo role='test' />",
      options: [{ ignoreNonDOM: true }]
    }
  ],
  invalid: ["<div role='datepicker' />", "<div role='' />"]
});
