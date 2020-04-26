const rule = require("../no-redundant-roles");
const makeRuleTester = require("./makeRuleTester");

makeRuleTester("no-redundant-roles", rule, {
  valid: ["<a role='link' />", "<div role='link' />"],
  invalid: [
    {
      code: "<img role='img' src='foo.jpg' />",
      errors: [{ message: rule.makeMessage("img", "img") }]
    },
    {
      code: "<a role='link' href='#' />",
      errors: [{ message: rule.makeMessage("a", "link") }]
    },
    {
      code: "<button role='button' />",
      errors: [{ message: rule.makeMessage("button", "button") }]
    }
  ]
});
