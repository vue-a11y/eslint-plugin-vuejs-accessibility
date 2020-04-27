const rule = require("../no-redundant-roles");
const makeRuleTester = require("./makeRuleTester");

makeRuleTester("no-redundant-roles", rule, {
  valid: ["<a role='link' />", "<div role='link' />"],
  invalid: [
    {
      code: "<img role='img' src='foo.jpg' />",
      errors: [{ messageId: "default", data: { type: "img", role: "img" } }]
    },
    {
      code: "<a role='link' href='#' />",
      errors: [{ messageId: "default", data: { type: "a", role: "link" } }]
    },
    {
      code: "<button role='button' />",
      errors: [
        { messageId: "default", data: { type: "button", role: "button" } }
      ]
    }
  ]
});
