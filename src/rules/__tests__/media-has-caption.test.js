const rule = require("../media-has-caption");
const makeRuleTester = require("./makeRuleTester");

const options = [
  {
    audio: ["Audio"],
    video: ["Video"],
    track: ["Track"]
  }
];

makeRuleTester("media-has-caption", rule, {
  valid: [
    "<div />",
    "<MyDiv />",
    "<audio><track kind='captions' /></audio>",
    "<audio><track kind='Captions' /></audio>",
    "<audio><track kind='Captions' /><track kind='subtitles' /></audio>",
    "<video><track kind='captions' /></video>",
    "<video><track kind='Captions' /></video>",
    "<video><track kind='Captions' /><track kind='subtitles' /></video>",
    "<audio muted='true' />",
    "<video muted='true' />",
    "<video muted />",
    {
      code: "<template><Audio><track kind='captions' /></Audio></template>",
      options
    },
    {
      code: "<template><audio><Track kind='captions' /></audio></template>",
      options
    },
    {
      code: "<template><Video><track kind='captions' /></Video></template>",
      options
    },
    {
      code: "<template><video><Track kind='captions' /></video></template>",
      options
    },
    {
      code: "<template><Audio><Track kind='captions' /></Audio></template>",
      options
    },
    {
      code: "<template><Video><Track kind='captions' /></Video></template>",
      options
    },
    {
      code: "<template><Video muted /></template>",
      options
    },
    {
      code: "<template><Video muted='true' /></template>",
      options
    },
    {
      code: "<template><Audio muted /></template>",
      options
    },
    {
      code: "<template><Audio muted='true' /></template>",
      options
    }
  ],
  invalid: [
    "<audio><track /></audio>",
    "<audio><track kind='subtitles' /></audio>",
    "<audio />",
    "<video><track /></video>",
    "<video><track kind='subtitles' /></video>",
    {
      code: "<template><Audio muted='false' /></template>",
      options,
      errors: [{ message: rule.message }]
    },
    {
      code: "<template><Video muted='false' /></template>",
      options,
      errors: [{ message: rule.message }]
    },
    "<video />",
    "<audio>Foo</audio>",
    "<video>Foo</video>",
    {
      code: "<template><Audio /></template>",
      options,
      errors: [{ message: rule.message }]
    },
    {
      code: "<template><Video /></template>",
      options,
      errors: [{ message: rule.message }]
    },
    {
      code: "<template><audio><Track /></audio></template>",
      options,
      errors: [{ message: rule.message }]
    },
    {
      code: "<template><video><Track /></video></template>",
      options,
      errors: [{ message: rule.message }]
    },
    {
      code: "<template><Audio><Track kind='subtitles' /></Audio></template>",
      options,
      errors: [{ message: rule.message }]
    },
    {
      code: "<template><Video><Track kind='subtitles' /></Video></template>",
      options,
      errors: [{ message: rule.message }]
    }
  ]
});
