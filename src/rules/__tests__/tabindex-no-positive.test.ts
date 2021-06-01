import rule from "../tabindex-no-positive";
import makeRuleTester from "./makeRuleTester";

makeRuleTester("tabindex-no-positive", rule, {
  valid: [
    "<span tabindex='0' />",
    "<span v-if='true' tabindex='0' />",
    "<span tabindex='-1' />",
    "<span :tabindex='number' />"
  ],
  invalid: [
    "<span tabindex='1' />",
    "<span tabindex='2' />",
    "<span :tabindex='2' />"
  ]
});
