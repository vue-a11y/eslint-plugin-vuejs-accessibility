# aria-role

Elements with ARIA roles must use a valid, non-abstract ARIA role.

_References:_

1. [WAI-ARIA](https://www.w3.org/TR/wai-aria/#role_definitions) site.
2. [AX_ARIA_01](https://github.com/GoogleChrome/accessibility-developer-tools/wiki/Audit-Rules#ax_aria_01)
3. [DPUB-ARIA roles](https://www.w3.org/TR/dpub-aria-1.0/)

## Rule details

This rule takes one optional object argument of type object:

```json
{
  "rules": {
    "vuejs-accessibility/aria-role": ["error", { "ignoreNonDOM": true }]
  }
}
```

### Succeed

```vue
<div role="button" />
<!-- Good: "button" is a valid ARIA role -->
<div :role="role" />
<!-- Good: role is a variable & cannot be determined until runtime. -->
<div />
<!-- Good: No ARIA role -->
<Foo role="test" />
<!-- Good: ignoreNonDOM is set to true -->
```

### Fail

```vue
<div role="datepicker" />
<!-- Bad: "datepicker" is not an ARIA role -->
<div role="range" />
<!-- Bad: "range" is an _abstract_ ARIA role -->
```
