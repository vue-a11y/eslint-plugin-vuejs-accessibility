import rule from "../no-distracting-elements";
import makeRuleTester from "./makeRuleTester";

makeRuleTester("no-distracting-elements", rule, {
  valid: ["<div />"],
  invalid: [
    {
      code: "<blink />",
      errors: [{ messageId: "default", data: { elementType: "blink" } }]
    },
    {
      code: "<marquee />",
      errors: [{ messageId: "default", data: { elementType: "marquee" } }]
    },
    {
      code: "<v-distract />",
      options: [{ elements: ["VDistract"] }],
      errors: [{ messageId: "default", data: { elementType: "v-distract" } }]
    }
  ]
});
