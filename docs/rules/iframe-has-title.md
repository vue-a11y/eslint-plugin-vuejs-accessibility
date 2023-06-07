# iframe-has-title

`<iframe>` elements must have a unique title property to indicate its content to the user.

## 🔧 Options

This rule takes no arguments.

### ✔ Succeed

```vue
<template>
  <iframe title="This is a unique title" />
  <iframe :title="uniqueTitle" />
</template>
```

### ❌ Fail

```vue
<template>
  <iframe />
  <iframe title="" />
</template>
```

## 📚 Resources

- [Deque University](https://dequeuniversity.com/rules/axe/1.1/frame-title)
