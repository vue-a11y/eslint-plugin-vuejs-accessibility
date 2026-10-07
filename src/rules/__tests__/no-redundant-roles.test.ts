import rule from "../no-redundant-roles";
import makeRuleTester from "./makeRuleTester";

makeRuleTester("no-redundant-roles", rule, {
  valid: [
    "<a role='link' />",
    "<div role='link' />",
    "<nav role='navigation' />",
    "<button :role='dynamicRole' />",
    { code: "<button role='button' />", options: [{ button: ["button"] }] }
  ],
  invalid: [
    {
      code: "<div is='button' role='button' />",
      errors: [
        { messageId: "default", data: { type: "button", role: "button" } }
      ]
    },
    {
      code: "<button :role=\"'button'\" />",
      errors: [
        { messageId: "default", data: { type: "button", role: "button" } }
      ]
    },
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
