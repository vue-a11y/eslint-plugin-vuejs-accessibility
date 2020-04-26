const rule = require("../click-events-have-key-events");
const makeRuleTester = require("./makeRuleTester");

makeRuleTester("click-events-have-key-events", rule, {
  valid: [
    "<div @click='void 0' @keydown='void 0' />",
    "<div @click='void 0' @keyup='void 0' />",
    "<div @click='void 0' @keypress='void 0' />",
    "<div @click='void 0' @keydown='void 0' @keydown='baz' />",
    "<div class='void 0' />",
    "<div @click='void 0' aria-hidden />",
    "<div @click='void 0' aria-hidden='true' />",
    "<div @click='void 0' aria-hidden='false' @keydown='void 0' />",
    "<div @click='void 0' @keydown='void 0' aria-hidden='undefined' />",
    "<input type='text' @click='void 0' />",
    "<input @click='void 0' />",
    "<button @click='void 0' class='void 0' />",
    "<option @click='void 0' class='void 0' />",
    "<select @click='void 0' class='void 0' />",
    "<textarea @click='void 0' class='void 0' />",
    "<a @click='void 0' href='http://x.y.z' />",
    "<a @click='void 0' href='http://x.y.z' tabIndex='0' />",
    "<input @click='void 0' type='hidden' />",
    "<div @click='void 0' role='presentation' />",
    "<div @click='void 0' role='none' />",
    "<TestComponent @click='void 0' />",
    "<Button @click='void 0' />"
  ],
  invalid: [
    "<div @click='void 0' />",
    "<div @click='void 0' role='undefined' />",
    "<section @click='void 0' />",
    "<main @click='void 0' />",
    "<article @click='void 0' />",
    "<header @click='void 0' />",
    "<footer @click='void 0' />",
    "<div @click='void 0' aria-hidden='false' />",
    "<a @click='void 0' />",
    "<a tabIndex='0' @click='void 0' />"
  ]
});
