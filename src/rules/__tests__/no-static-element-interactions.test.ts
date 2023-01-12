import rule from "../no-static-element-interactions";
import makeRuleTester from "./makeRuleTester";

makeRuleTester("no-static-element-interactions", rule, {
  valid: [
    // Doesn't contain relevant directives
    "<div />",
    "<div id='foo' />",
    "<CoolComponent />",
    "<div class='foo' />",
    "<form @submit='void 0' />",

    // Contains relevant directives
    "<div @click='void 0' role='button' />",
    "<div @contextmenu='void 0' role='button' />",
    "<div @dblclick='void 0' role='button' />",
    "<div @doubleclick='void 0' role='button' />",
    "<div @drag='void 0' role='button' />",
    "<div @dragend='void 0' role='button' />",
    "<div @dragenter='void 0' role='button' />",
    "<div @dragexit='void 0' role='button' />",
    "<div @dragleave='void 0' role='button' />",
    "<div @dragover='void 0' role='button' />",
    "<div @dragstart='void 0' role='button' />",
    "<div @drop='void 0' role='button' />",
    "<div @keydown='void 0' role='button' />",
    "<div @keypress='void 0' role='button' />",
    "<div @keyup='void 0' role='button' />",
    "<div @mousedown='void 0' role='button' />",
    "<div @mouseenter='void 0' role='button' />",
    "<div @mouseleave='void 0' role='button' />",
    "<div @mousemove='void 0' role='button' />",
    "<div @mouseout='void 0' role='button' />",
    "<div @mouseover='void 0' role='button' />",
    "<div @mouseup='void 0' role='button' />",

    // Elements which don't require `role='button'`
    "<button @click='void 0' />",
    "<input @click='void 0'} />",

    // Exception: Elements hidden for screenreaders
    "<div @click='void 0' aria-hidden='true'/>",

    // Exception: `role='presentation'`
    "<div @click='void 0' role='presentation'/>",
  ],
  invalid: [
    // Contains relevant directives but no `role='button'`
    "<div @click='void 0' />",
    "<div @contextmenu='void 0' />",
    "<div @dblclick='void 0' />",
    "<div @doubleclick='void 0' />",
    "<div @drag='void 0' />",
    "<div @dragend='void 0' />",
    "<div @dragenter='void 0' />",
    "<div @dragexit='void 0' />",
    "<div @dragleave='void 0' />",
    "<div @dragover='void 0' />",
    "<div @dragstart='void 0' />",
    "<div @drop='void 0' />",
    "<div @keydown='void 0' />",
    "<div @keypress='void 0' />",
    "<div @keyup='void 0' />",
    "<div @mousedown='void 0' />",
    "<div @mouseenter='void 0' />",
    "<div @mouseleave='void 0' />",
    "<div @mousemove='void 0' />",
    "<div @mouseout='void 0' />",
    "<div @mouseover='void 0' />",
    "<div @mouseup='void 0' />",

    // Check other element types
    "<a @click='void 0' />",
    "<a @mousedown='void 0' />",
    "<span @click='void 0' />",
    "<span @mousedown='void 0' />",
    "<section @click='void 0' />",
    "<section @mousedown='void 0' />",
  ]
});
