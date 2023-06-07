# aria-unsupported-elements

Certain reserved DOM elements do not support ARIA roles, states, and properties. This is often because they are not visible, for example `meta`, `html`, `script`, `style`. This rule enforces that these DOM elements do not contain the `role` and/or `aria-*` props.

## 🔧 Options

This rule takes no arguments.

### ✔ Succeed

```html
<meta charset="UTF-8" />
```

### ❌ Fail

```html
<meta charset="UTF-8" aria-hidden="false" />
```

## 📚 Resources

- [AX_ARIA_12](https://github.com/GoogleChrome/accessibility-developer-tools/wiki/Audit-Rules#ax_aria_12)
