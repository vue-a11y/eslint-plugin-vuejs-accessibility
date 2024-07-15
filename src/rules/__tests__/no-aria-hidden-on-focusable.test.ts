import rule from '../no-aria-hidden-on-focusable';
import makeRuleTester from "./makeRuleTester";

makeRuleTester('no-presentation-role-or-aria-hidden-on-focusable', rule, {
    valid: [
        "<button>Submit</button>",
        "<div aria-hidden='true'><button tabindex='-1'>Some text</button></div>",
        "<div><button>Submit</button></div>",
        "<a href='#' tabindex='-1'>link</a>",
        "<button tabindex='-1' aria-hidden='true'>Press</button>",
        "<div aria-hidden='true'><a href='#' tabindex='-1'>Link</a></div>"
    ],
    invalid: [
        {
            code: "<div aria-hidden='true'><button>Submit</button></div>",
            errors: [{messageId: "default"}]
        },
        {
            code: "<button type='button' aria-hidden='true'>Submit</button>",
            errors: [{messageId: "default"}]
        },
        {
            code: "<a href='#' aria-hidden='true'>Link</a>",
            errors: [{messageId: "default"}]
        },
        {
            code: "<span tabindex='0' aria-hidden='true'><em>Icon</em></span>",
            errors: [{messageId: "default"}]
        }
    ]
})
