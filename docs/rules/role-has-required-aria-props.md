# role-has-required-aria-props

Elements with ARIA roles must have all required attributes for that role.

_References:_

1. [W3](https://www.w3.org/TR/wai-aria/roles)
2. [AX_ARIA_03](https://github.com/GoogleChrome/accessibility-developer-tools/wiki/Audit-Rules#ax_aria_03)

## Rule details

This rule takes no arguments.

### Succeed

```vue
<span
  role="checkbox"
  aria-checked="false"
  aria-labelledby="test"
  tabindex="0"
/>
```

### Fail

```vue
<span role="checkbox" aria-labelledby="test" tabindex="0" />
```
