import rule from "../no-autofocus";
import makeRuleTester from "./makeRuleTester";

makeRuleTester("no-autofocus", rule, {
  valid: [
    "<input required />",
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
