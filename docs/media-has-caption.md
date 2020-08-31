# media-has-caption

Providing captions for media is essential for deaf users to follow along. Captions should be a transcription or translation of the dialogue, sound effects, relevant musical cues, and other relevant audio information. Not only is this important for accessibility, but can also be useful for all users in the case that the media is unavailable (similar to `alt` text on an image when an image is unable to load).

The captions should contain all important and relevant information to understand the corresponding media. This may mean that the captions are not a 1:1 mapping of the dialogue in the media content. However, captions are _not_ necessary for video components with the `muted` attribute.

_References:_

1. [AXE Audio](https://dequeuniversity.com/rules/axe/2.1/audio-caption)
2. [AXE Video](https://dequeuniversity.com/rules/axe/2.1/video-caption)

## Rule details

This rule takes one optional object argument of type object:

```json
{
  "rules": {
    "vuejs-accessibility/media-has-caption": [
      "error",
      {
        "audio": ["Audio"],
        "video": ["Video"],
        "track": ["Track"]
      }
    ]
  }
}
```

For the `audio`, `video`, and `track` options, these strings determine which elements (**always including** their corresponding DOM element) should be used for this rule. This is a good use case when you have a wrapper component that simply renders an `audio`, `video`, or `track` element.

### Succeed

```vue
<audio><track kind="captions" /></audio>
<video><track kind="captions" /></video>
<video muted />
```

### Fail

```vue
<audio />
<video />
```
