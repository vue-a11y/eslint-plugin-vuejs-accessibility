# role-has-required-aria-props

Elements with ARIA roles must have all required attributes for that role.

## 🔧 Options

This rule takes no arguments.

### ✔ Succeed

```vue
<template>
  <span
    role="checkbox"
    aria-checked="false"
    aria-labelledby="test"
    tabindex="0"
  />
</template>
```

### ❌ Fail

```vue
<template>
  <span role="checkbox" aria-labelledby="test" tabindex="0" />
</template>
```

## 📚 Resources

1. [W3](https://www.w3.org/TR/wai-aria/roles)
2. [AX_ARIA_03](https://github.com/GoogleChrome/accessibility-developer-tools/wiki/Audit-Rules#ax_aria_03)
