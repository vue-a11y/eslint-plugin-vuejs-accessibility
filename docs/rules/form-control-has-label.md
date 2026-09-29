# form-control-has-label

Each form element must have a programmatically associated label element. You can do so by using an implicit `<label>`, explicit `<label>`, `aria-label`, `aria-labelledby` or `title`.

## 🔧 Options

This rule takes one optional object argument of type object:

```json
{
  "rules": {
    "vuejs-accessibility/form-control-has-label": [
      "error",
      {
        "labelComponents": ["CustomLabel"],
        "controlComponents": ["CustomInput"]
      }
    ]
  }
}
```

For the `labelComponents` option, these strings determine which elements (**always including** `<label>`) should be checked for having the `for` prop. This is a good use case when you have a wrapper component that simply renders a `label` element.

For the `controlComponents` option, these strings determine which elements (**always including** `<input>`, `<textarea>` and `<select>`) should be checked for having an associated label. This is a good use case when you have a wrapper component that simply renders an input element.

### ✔ Succeed

```vue
<template>
  <label><input type="text" /></label>
  <input aria-label="test" type="text" />
  <input aria-labelledby="#id" type="text" />
  <label for="id"></label><input aria-labelledby="#id" id="id" />
  <input title="test" type="text" />
  <input :title="test" type="text" />
  <input type="image" />
</template>
```

### ❌ Fail

```vue
<template>
  <input value="1" type="text" />
  <textarea value="1"></textarea>
</template>
```

## 📚 Resources

- [AXE](https://dequeuniversity.com/rules/axe/2.1/label)
- [WCAG H65](https://www.w3.org/WAI/WCAG21/Techniques/html/H65.html)
