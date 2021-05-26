const rule = require("../form-control-has-label");
const makeRuleTester = require("./makeRuleTester");

makeRuleTester("form-control-has-label", rule, {
  valid: [
    "<label for=''><input type='text' /></label>",
    "<input type='text' aria-label='test' />",
    "<label for=''>text</label><input type='text' />",
    "<input type='button'>",
    `
      <label>
        <div>
          <input type="radio" />
        </div>
        <div>
          <slot />
        </div>
      </label>
    `,
    `
      <div aria-hidden="true">
        <input value="1" type="text" />
      </div>
    `
  ],
  invalid: ["<input type='text' />", "<textarea type='text'></textarea>"]
});
