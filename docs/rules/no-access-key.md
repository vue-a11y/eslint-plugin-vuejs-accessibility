# no-access-key

Enforce no `accesskey` prop on element. Access keys are HTML attributes that allow web developers to assign keyboard shortcuts to elements. Inconsistencies between keyboard shortcuts and keyboard commands used by screenreader and keyboard-only users create accessibility complications. To avoid complications, access keys should not be used.

## 🔧 Options

This rule takes no arguments.

### ✔ Succeed

```vue
<template>
  <div>Stress reliever</div>
</template>
```

### ❌ Fail

```vue
<template>
  <div accesskey="s">Stress reliever</div>
  <div :accesskey="s">Stress reliever</div>
</template>
```

## 📚 Resources

- [WebAIM](http://webaim.org/techniques/keyboard/accesskey#spec)
