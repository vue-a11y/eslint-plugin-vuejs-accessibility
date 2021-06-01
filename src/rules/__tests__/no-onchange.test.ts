import rule from "../no-onchange";
import makeRuleTester from "./makeRuleTester";

makeRuleTester("no-onchange", rule, {
  valid: ["<select><option @blur='void 0' @change='void 0' /></select>"],
  invalid: ["<select @change='void 0'><option /></select>"]
});
