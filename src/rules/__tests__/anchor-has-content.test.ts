import rule from "../anchor-has-content";
import makeRuleTester from "./makeRuleTester";

makeRuleTester("anchor-has-content", rule, {
  valid: [
    "<a>Anchor Content!</a>",
    "<a is='TextWrapper' />",
    "<a v-text='msg' />",
    "<a v-html='msg' />",
    "<a><slot /></a>",
    "<VAnchor  />",
    "<a aria-label='This is my label' />",
    "<a><img alt='foo' /></a>",
    {
      code: "<a v-accessibleDirective='msg' />",
      options: [{ accessibleDirectives: ["accessibleDirective"] }]
    },
    {
      code: "<a><accessible-child /></a>",
      options: [{ accessibleChildren: ["AccessibleChild"] }]
    }
  ],
  invalid: [
    "<a />",
    {
      code: "<v-anchor  />",
      options: [{ components: ["VAnchor"] }],
      errors: [{ messageId: "default" }]
    },
    "<a><img aria-hidden alt='foo' /></a>"
  ]
});
