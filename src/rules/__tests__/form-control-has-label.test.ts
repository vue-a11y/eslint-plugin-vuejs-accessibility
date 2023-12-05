import rule from "../form-control-has-label";
import makeRuleTester from "./makeRuleTester";

makeRuleTester("form-control-has-label", rule, {
  valid: [
    "<label for=''><input type='text' /></label>",
    "<input type='text' aria-label='test' />",
    "<input type='button'>",
    `
      <div class="checkbox">
        <label for="check">I agree</label>
        <input id="check" type="checkbox" />
      </div>
    `,
    `
      <div class="checkbox">
        <input id="myCheckbox" type="checkbox" aria-describedby="myCheckboxInfo" />
        <div class="checkbox-label">
          <label for="myCheckbox">I agree</label>
          <p id="myCheckboxInfo">Here is some extra info what I agree upon</p>
        </div>
      </div>
    `,
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
    {
      code: "<custom-label for='input'>text</custom-label><input type='text' id='input' />",
      options: [{ labelComponents: ["CustomLabel"] }]
    },
    "<b-form-input />"
  ],
  invalid: [
    "<label for=''>text</label><input type='text' />",
    `
      <div class="checkbox">
        <input type="checkbox" />
        <label>I agree</label>
      </div>
    `,
    "<input type='text' />",
    "<textarea type='text'></textarea>",
    {
      code: "<div><b-form-input /></div>",
      options: [{ controlComponents: ["b-form-input"] }],
      errors: [{ messageId: "default" }]
    }
  ]
});
