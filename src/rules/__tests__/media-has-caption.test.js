const rule = require("../media-has-caption");
const makeRuleTester = require("./makeRuleTester");

const options = [
  {
    audio: ["VAudio"],
    video: ["VVideo"],
    track: ["VTrack"]
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
      code: "<VAudio><track kind='captions' /></VAudio>",
      options
    },
    {
      code: "<audio><VTrack kind='captions' /></audio>",
      options
    },
    {
      code: "<VVideo><track kind='captions' /></VVideo>",
      options
    },
    {
      code: "<video><VTrack kind='captions' /></video>",
      options
    },
    {
      code: "<VAudio><VTrack kind='captions' /></VAudio>",
      options
    },
    {
      code: "<VVideo><VTrack kind='captions' /></VVideo>",
      options
    },
    {
      code: "<VVideo muted />",
      options
    },
    {
      code: "<VVideo muted='true' />",
      options
    },
    {
      code: "<VAudio muted />",
      options
    },
    {
      code: "<VAudio muted='true' />",
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
      code: "<VAudio muted='false' />",
      options,
      errors: [{ messageId: "default" }]
    },
    {
      code: "<VVideo muted='false' />",
      options,
      errors: [{ messageId: "default" }]
    },
    "<video />",
    "<audio>Foo</audio>",
    "<video>Foo</video>",
    {
      code: "<VAudio />",
      options,
      errors: [{ messageId: "default" }]
    },
    {
      code: "<VVideo />",
      options,
      errors: [{ messageId: "default" }]
    },
    {
      code: "<audio><VTrack /></audio>",
      options,
      errors: [{ messageId: "default" }]
    },
    {
      code: "<video><VTrack /></video>",
      options,
      errors: [{ messageId: "default" }]
    },
    {
      code: "<VAudio><VTrack kind='subtitles' /></VAudio>",
      options,
      errors: [{ messageId: "default" }]
    },
    {
      code: "<VVideo><VTrack kind='subtitles' /></VVideo>",
      options,
      errors: [{ messageId: "default" }]
    },
    {
      code: "<v-video><v-track kind='subtitles' /></v-video>",
      options,
      errors: [{ messageId: "default" }]
    }
  ]
});
