import rule from "../form-control-has-label";
import makeRuleTester from "./makeRuleTester";

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
    `,
    "<b-form-input />"
  ],
  invalid: [
    "<input type='text' />",
    "<textarea type='text'></textarea>",
    {
      code: "<div><b-form-input /></div>",
      options: [{ controlComponents: ["b-form-input"] }],
      errors: [{ messageId: "default" }]
    }
  ]
});
