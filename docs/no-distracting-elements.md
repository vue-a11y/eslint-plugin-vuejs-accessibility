# no-distracting-elements

Enforces that no distracting elements are used. Elements that can be visually distracting can cause accessibility issues with visually impaired users. Such elements are most likely deprecated, and should be avoided. By default, the following elements are visually distracting: `<marquee>` and `<blink>`.

_References:_

1. [axe-core marquee](https://dequeuniversity.com/rules/axe/3.2/marquee)
2. [axe-core blink](https://dequeuniversity.com/rules/axe/3.2/blink)

## Rule details

This rule takes one optional object argument of type object:

```json
{
  "rules": {
    "vuejs-accessibility/no-distracting-elements": [
      "error",
      {
        "elements": ["marquee", "blink"]
      }
    ]
  }
}
```

For the `elements` option, these strings determine which elements should be checked for usage. This shouldn't need to be configured unless you have a seriously compelling use case for these elements.

### Succeed

```vue
<div />
```

### Fail

```vue
<marquee />
<blink />
```
