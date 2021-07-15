import rule from "../heading-has-content";
import makeRuleTester from "./makeRuleTester";

makeRuleTester("heading-has-content", rule, {
  valid: [
    "<h1>test</h1>",
    "<h1><span>test</span></h1>",
    "<h1 v-text='msg'></h1>",
    "<h1 v-html='msg'></h1>",
    "<h1>{{ test }}</h1>",
    "<h1><slot /></h1>",
    {
      code: "<h1 v-accessibleDirective='msg'></h1>",
      options: [{ accessibleDirectives: ["accessibleDirective"] }]
    },
    {
      code: "<h1><accessible-child /></h1>",
      options: [{ accessibleChildren: ["AccessibleChild"] }]
    }
  ],
  invalid: [
    "<h1 />",
    "<h1><span /></h1>",
    "<h1><span aria-hidden='true'>test</span></h1>",
    "<h1>   </h1>",
    {
      code: "<v-heading />",
      options: [{ components: ["VHeading"] }],
      errors: [{ messageId: "default" }]
    }
  ]
});
