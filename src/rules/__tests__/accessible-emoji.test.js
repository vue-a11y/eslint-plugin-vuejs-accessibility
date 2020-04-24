const rule = require("../accessible-emoji");
const makeRuleTester = require("./makeRuleTester");

makeRuleTester("accessible-emoji", rule, {
  valid: [
    "<div />",
    "<span />",
    "<span role='img' aria-label='Panda face'>😰</span>",
    "<span role='img' aria-label='Snowman'>&#9731;</span>"
  ],
  invalid: [
    "<span>😰</span>",
    "<i role='img' aria-label='Panda face'>😰</i>",
    "<Foo>😰</Foo>",
    "<span>foo 😰 bar</span>"
  ]
});
