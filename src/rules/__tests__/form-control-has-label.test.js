const rule = require("../form-control-has-label");
const makeRuleTester = require("./makeRuleTester");

makeRuleTester("form-control-has-label", rule, {
  valid: [
    "<label for=''><input type='text' /></label>",
    "<input type='text' aria-label='test' />",
    "<label for=''>text</label><input type='text' />",
    "<input type='button'>"
  ],
  invalid: ["<input type='text' />", "<textarea type='text'></textarea>"]
});
