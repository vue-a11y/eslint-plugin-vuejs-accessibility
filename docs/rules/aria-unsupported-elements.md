# aria-unsupported-elements

Certain reserved DOM elements do not support ARIA roles, states, and properties. This is often because they are not visible, for example `meta`, `html`, `script`, `style`. This rule enforces that these DOM elements do not contain the `role` and/or `aria-*` props.

_References:_

1. [AX_ARIA_12](https://github.com/GoogleChrome/accessibility-developer-tools/wiki/Audit-Rules#ax_aria_12)

## Rule details

This rule takes no arguments.

### Succeed

```
<meta charset="UTF-8" />
```

### Fail

```
<meta charset="UTF-8" aria-hidden="false" />
```
