import rule from "../no-role-presentation-on-focusable";
import makeRuleTester from "./makeRuleTester";

makeRuleTester("no-role-presentation-role-on-focusable", rule, {
  valid: [
    "<button>Submit</button>",
    "<div role='presentation'><button tabindex='-1'>Some text</button></div>",
    "<div><button>Submit</button></div>",
    "<a href='#' tabindex='-1'>link</a>",
    "<button tabindex='-1' role='presentation'>Press</button>",
    "<div role='presentation'><a href='#' tabindex='-1'>Link</a></div>"
  ],
  invalid: [
    {
      code: "<div role='presentation'><button>Submit</button></div>",
      errors: [{ messageId: "default" }]
    },
    {
      code: "<button type='button' role='presentation'>Submit</button>",
      errors: [{ messageId: "default" }]
    },
    {
      code: "<a href='#' role='presentation'>Link</a>",
      errors: [{ messageId: "default" }]
    },
    {
      code: "<span tabindex='0' role='presentation'><em>Icon</em></span>",
      errors: [{ messageId: "default" }]
    }
  ]
});
