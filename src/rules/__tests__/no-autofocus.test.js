const rule = require("../no-autofocus");
const makeRuleTester = require("./makeRuleTester");

makeRuleTester("no-autofocus", rule, {
  valid: [
    "<div />",
    {
      code: "<Anchor autofocus='autofocus' />",
      options: [{ ignoreNonDOM: true }]
    }
  ],
  invalid: [
    "<div autofocus />",
    "<div autofocus='true' />",
    "<div :autofocus='sth' />"
  ]
});
