# no-autofocus

Enforce that autofocus prop is not used on elements. Autofocusing elements can cause usability issues for sighted and non-sighted users alike.

## 🔧 Options

This rule takes one optional object argument of type object:

```json
{
  "rules": {
    "vuejs-accessibility/no-autofocus": ["error", { "ignoreNonDOM": true }]
  }
}
```

For the `ignoreNonDOM` option, this determines if developer created components are checked.

### ✔ Succeed

```vue
<template>
  <div />
</template>
```

### ❌ Fail

```vue
<template>
  <input autofocus="autofocus" />
  <div autofocus />
  <div :autofocus="true" />
  <div :autofocus="false" />
  <div :autofocus="undefined" />
</template>
```

## 📚 Resources

- [W3C](https://w3c.github.io/html/sec-forms.html#autofocusing-a-form-control-the-autofocus-attribute)
