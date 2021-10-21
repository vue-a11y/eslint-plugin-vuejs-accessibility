import rule from "../alt-text";
import makeRuleTester from "./makeRuleTester";

makeRuleTester("alt-text", rule, {
  valid: [
    "<img src='foo' alt='Foo eating a sandwich.' />",
    "<img src='foo' alt='' />",
    "<img src='foo' :alt='msg' />",
    "<object aria-label='foo' />",
    "<object :aria-label='foo' />",
    "<object aria-labelledby='id1' />",
    "<object title='foo' />",
    "<object>test</object>",
    "<input :type='image' alt='This is descriptive!' />",
    "<input :type='true' />"
  ],
  invalid: [
    {
      code: "<img src='foo' />",
      errors: [{ messageId: "imgMissingAlt" }]
    },
    {
      code: "<img src='foo' alt />",
      errors: [{ messageId: "imgInvalidAlt" }]
    },
    {
      code: "<img src='foo' role='presentation' />",
      errors: [{ messageId: "imgPresentation" }]
    },
    {
      code: "<object />",
      errors: [{ messageId: "object" }]
    },
    {
      code: "<area />",
      errors: [{ messageId: "area" }]
    },
    {
      code: "<input type='image' />",
      errors: [{ messageId: "input" }]
    },
    {
      code: "<custom-image />",
      options: [{ img: ["CustomImage"] }],
      errors: [{ messageId: "imgMissingAlt" }]
    },
    {
      code: "<CustomImage />",
      options: [{ img: ["custom-image"] }],
      errors: [{ messageId: "imgMissingAlt" }]
    }
  ]
});
