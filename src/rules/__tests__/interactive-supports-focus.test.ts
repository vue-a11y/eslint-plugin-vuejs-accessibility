import rule from "../interactive-supports-focus";
import makeRuleTester from "./makeRuleTester";

makeRuleTester("interactive-supports-focus", rule, {
  valid: [
    "<div />",
    "<div aria-hidden @click='void 0' />",
    "<div aria-hidden='true' @click='void 0' />",
    "<div aria-hidden='hidden !== false' @click='void 0' />",
    "<div aria-hidden='1 < 2' @click='void 0' />",
    "<div aria-hidden='1 <= 2' @click='void 0' />",
    "<div @click='void 0' />",
    "<div @click='void 0' :tabindex='undefined' />",
    "<div @click='void 0' tabindex='bad' />",
    "<div @click='void 0' :role='undefined' />",
    "<div role='section' @click='void 0' />",
    "<div @click='void 0' :aria-hidden='false' />",
    "<input type='text' @click='void 0' />",
    "<input type='hidden' @click='void 0' tabindex='-1' />",
    "<input type='hidden' @click='void 0' :tabindex='-1' />",
    "<input @click='void 0' />",
    "<input @click='void 0' role='combobox' />",
    "<button @click='void 0' class='foo' />",
    "<option @click='void 0' class='foo' />",
    "<select @click='void 0' class='foo' />",
    "<area href='#' @click='void 0' class='foo' />",
    "<area @click='void 0' class='foo' />",
    "<textarea @click='void 0' class='foo' />",
    "<a @click='showNextPage'>Next page</a>",
    "<a @click='showNextPage' :tabindex='undefined'>Next page</a>",
    "<a @click='showNextPage()' tabindex='bad'>Next page</a>",
    "<a @click='void 0' />",
    "<a tabindex='0' @click='void 0' />",
    "<a :tabindex='dynamicTabIndex' @click='void 0' />",
    "<a :tabindex='0' @click='void 0' />",
    "<a role='button' href='#' @click='void 0' />",
    "<a @click='void 0' href='http://x.y.z' />",
    "<a @click='void 0' href='http://x.y.z' tabindex='0' />",
    "<a @click='void 0' href='http://x.y.z' :tabindex='0' />",
    "<a @click='void 0' href='http://x.y.z' role='button' />",
    "<TestComponent @click='foo' />",
    "<input @click='void 0' type='hidden' />",
    "<span @click='submitForm'>Submit</span>",
    "<span @click='submitForm' tabindex='undefined'>Submit</span>",
    "<span @click='submitForm' tabindex='bad'>Submit</span>",
    "<span @click='doSomething' tabindex='0'>Click me!</span>",
    "<span @click='doSomething' :tabindex='0'>Click me!</span>",
    "<span @click='doSomething' tabindex='-1'>Click me too!</span>",
    "<a href='javascript:void(0);' @click='doSomething'>Click ALL the things!</a>",
    "<section @click='void 0' />",
    "<main @click='void 0' />",
    "<article @click='void 0' />",
    "<header @click='void 0' />",
    "<footer @click='void 0' />",
    ...rule.interactiveRoles.map((role) => ({
      code: `<div role='${role}' tabindex='0' @click='void 0' />`,
      options: [{ tabbable: rule.interactiveRoles }]
    })),
    "<div role='tab' tabindex='0' @click='void 0' />",
    "<div role='textbox' tabindex='0' @click='void 0' />",
    "<div role='textbox' aria-disabled='true' @click='void 0' />",
    "<Foo.Bar @click='void 0' aria-hidden='false' />",
    "<Input @click='void 0' type='hidden' />",
    `<component role="button" :is="foo ? 'a' : 'button'" />`,
    "<div role='textbox' :tabindex='false || 0' :aria-disabled='false' @click='void 0' />",
  ],
  invalid: [
    ...rule.interactiveRoles.flatMap((role) =>
      rule.interactiveHandlers.map((handler) => ({
        code: `<div role='${role}' @${handler}='void 0' />`,
        options: [{ tabbable: rule.interactiveRoles }],
        errors: [{ messageId: "tabbable", data: { role } }]
      }))
    ),
    ...rule.interactiveRoles.flatMap((role) =>
      rule.interactiveHandlers.map((handler) => ({
        code: `<div role='${role}' @${handler}='void 0' />`,
        options: [{ tabbable: [] }],
        errors: [{ messageId: "focusable", data: { role } }]
      }))
    )
  ]
});
