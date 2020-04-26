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
      code: "<Audio><track kind='captions' /></Audio>",
      options
    },
    {
      code: "<audio><Track kind='captions' /></audio>",
      options
    },
    {
      code: "<Video><track kind='captions' /></Video>",
      options
    },
    {
      code: "<video><Track kind='captions' /></video>",
      options
    },
    {
      code: "<Audio><Track kind='captions' /></Audio>",
      options
    },
    {
      code: "<Video><Track kind='captions' /></Video>",
      options
    },
    {
      code: "<Video muted />",
      options
    },
    {
      code: "<Video muted='true' />",
      options
    },
    {
      code: "<Audio muted />",
      options
    },
    {
      code: "<Audio muted='true' />",
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
      code: "<Audio muted='false' />",
      options,
      errors: [{ message: rule.message }]
    },
    {
      code: "<Video muted='false' />",
      options,
      errors: [{ message: rule.message }]
    },
    "<video />",
    "<audio>Foo</audio>",
    "<video>Foo</video>",
    {
      code: "<Audio />",
      options,
      errors: [{ message: rule.message }]
    },
    {
      code: "<Video />",
      options,
      errors: [{ message: rule.message }]
    },
    {
      code: "<audio><Track /></audio>",
      options,
      errors: [{ message: rule.message }]
    },
    {
      code: "<video><Track /></video>",
      options,
      errors: [{ message: rule.message }]
    },
    {
      code: "<Audio><Track kind='subtitles' /></Audio>",
      options,
      errors: [{ message: rule.message }]
    },
    {
      code: "<Video><Track kind='subtitles' /></Video>",
      options,
      errors: [{ message: rule.message }]
    }
  ]
});
