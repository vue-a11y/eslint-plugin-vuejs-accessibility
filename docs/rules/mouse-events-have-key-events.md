# mouse-events-have-key-events

Enforce `@mouseenter`/`@mouseover`/`@mouseout`/`@mouseleave`/`@hover` are accompanied by `@focus`/`@blur`. Coding for the keyboard is important for users with physical disabilities who cannot use a mouse, AT compatibility, and screenreader users.

## 🔧 Options

This rule takes no arguments.

### ✔ Succeed

```vue
<template>
  <div @mouseover="foo" @focus="bar" />
  <div @mouseout="foo" @blur="bar" />
</template>
```

### ❌ Fail

```vue
<template>
  <div @mouseover="foo" />
</template>
```
