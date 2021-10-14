# aria-props

Elements cannot use an invalid ARIA attribute. This will fail if it finds an `aria-*` property that is not listed in [WAI-ARIA States and Properties spec](https://www.w3.org/TR/wai-aria/#state_prop_def).

## Rule details

This rule takes no arguments.

### Succeed

```vue
<input aria-labelledby="address" />
```

### Fail

```vue
<input aria-labeledby="address" />
```
