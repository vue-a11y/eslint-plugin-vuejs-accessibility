# click-events-have-key-events

Enforce `@click` is accompanied by at least one of the following: `@keyup`, `@keydown`, `@keypress`. Coding for the keyboard is important for users with physical disabilities who cannot use a mouse, AT compatibility, and screenreader users.

## Rule details

This rule takes no arguments.

### Succeed

```vue
<div @click="foo" @keydown="bar" />
<div @click="foo" @keyup="bar" />
<div @click="foo" @keypress="bar" />
```

### Fail

```vue
<div @click="foo" />
```
