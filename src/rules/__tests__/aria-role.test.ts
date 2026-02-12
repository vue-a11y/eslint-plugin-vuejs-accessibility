import rule from "../aria-role";
import makeRuleTester from "./makeRuleTester";

makeRuleTester("aria-role", rule, {
  valid: [
    "<input required />",
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
