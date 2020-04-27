const rule = require("../alt-text");
const makeRuleTester = require("./makeRuleTester");

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
      errors: [{ message: rule.messages.imgMissingAlt }]
    },
    {
      code: "<img src='foo' alt />",
      errors: [{ message: rule.messages.imgInvalidAlt }]
    },
    {
      code: "<img src='foo' role='presentation' />",
      errors: [{ message: rule.messages.imgPresentation }]
    },
    {
      code: "<object />",
      errors: [{ message: rule.messages.object }]
    },
    {
      code: "<area />",
      errors: [{ message: rule.messages.area }]
    },
    {
      code: "<input type='image' />",
      errors: [{ message: rule.messages.input }]
    }
  ]
});
