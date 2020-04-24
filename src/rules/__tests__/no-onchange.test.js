const rule = require("../no-onchange");
const makeRuleTester = require("./makeRuleTester");

makeRuleTester("no-onchange", rule, {
  valid: [
    "<select><option @blur='handleOnBlur' @change='handleOnChange' /></select>"
  ],
  invalid: ["<select @change='updateModel'><option /></select>"]
});
