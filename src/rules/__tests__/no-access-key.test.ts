import rule from "../no-access-key";
import makeRuleTester from "./makeRuleTester";

makeRuleTester("no-access-key", rule, {
  valid: ["<div />", "<div accesskey />"],
  invalid: ["<div accesskey='h' />", "<div :accesskey='h' />"]
});
