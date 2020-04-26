const rule = require("../click-events-have-key-events");
const makeRuleTester = require("./makeRuleTester");

makeRuleTester("click-events-have-key-events", rule, {
  valid: [
    "<div @click='foo' @keydown='bar' />",
    "<div @click='foo' @keyup='bar' />",
    "<div @click='foo' @keypress='bar' />",
    "<div @click='foo' @keydown='bar' @keydown='baz' />",
    "<div class='foo' />",
    "<div @click='foo' aria-hidden />",
    "<div @click='foo' aria-hidden='true' />",
    "<div @click='foo' aria-hidden='false' @keydown='bar' />",
    "<div @click='foo' @keydown='bar' aria-hidden='undefined' />",
    "<input type='text' @click='foo' />",
    "<input @click='foo' />",
    "<button @click='foo' class='foo' />",
    "<option @click='foo' class='foo' />",
    "<select @click='foo' class='foo' />",
    "<textarea @click='foo' class='foo' />",
    "<a @click='foo' href='http://x.y.z' />",
    "<a @click='foo' href='http://x.y.z' tabIndex='0' />",
    "<input @click='foo' type='hidden' />",
    "<div @click='foo' role='presentation' />",
    "<div @click='foo' role='none' />",
    "<TestComponent @click='foo' />",
    "<Button @click='foo' />"
  ],
  invalid: [
    "<div @click='foo' />",
    "<div @click='foo' role='undefined' />",
    "<section @click='foo' />",
    "<main @click='foo' />",
    "<article @click='foo' />",
    "<header @click='foo' />",
    "<footer @click='foo' />",
    "<div @click='foo' aria-hidden='false' />",
    "<a @click='foo' />",
    "<a tabIndex='0' @click='foo' />"
  ]
});
