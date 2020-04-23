const rule = require("../no-redundant-roles");
const makeRuleTester = require("./makeRuleTester");

makeRuleTester("no-redundant-roles", rule, {
  valid: ["<a role='link' />", "<div role='link' />"],
  invalid: [
    {
      code: '<template><img role="img" src="foo.jpg" /></template>',
      errors: [{ message: rule.makeMessage("img", "img") }]
    },
    {
      code: '<template><a role="link" href="#" /></template>',
      errors: [{ message: rule.makeMessage("a", "link") }]
    },
    {
      code: '<template><button role="button" /></template>',
      errors: [{ message: rule.makeMessage("button", "button") }]
    }
  ]
});
