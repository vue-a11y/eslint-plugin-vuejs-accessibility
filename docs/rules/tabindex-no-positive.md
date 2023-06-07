# tabindex-no-positive

Avoid positive tabindex property values to synchronize the flow of the page with keyboard tab order.

## 🔧 Options

This rule takes no arguments.

### ✔ Succeed

```vue
<span tabindex="0">foo</span>
<span tabindex="-1">bar</span>
<span :tabindex="0">baz</span>
```

### ❌ Fail

```vue
<span tabindex="5">foo</span>
<span tabindex="3">bar</span>
<span tabindex="1">baz</span>
<span tabindex="2">never really sure what goes after baz</span>
```

## 📚 Resources

- [AX_FOCUS_03](https://github.com/GoogleChrome/accessibility-developer-tools/wiki/Audit-Rules#ax_focus_03)
