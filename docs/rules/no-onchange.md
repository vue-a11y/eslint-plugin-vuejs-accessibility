# no-onchange

::: warning Deprecated
This rule is based on reports of behavior of [old browsers (eg. IE 10 and below)](https://www.quirksmode.org/dom/events/change.html#t05). In the meantime, this behavior has been corrected, both in newer versions of browsers as well as [in the DOM spec](https://bugzilla.mozilla.org/show_bug.cgi?id=969068#c2).
:::

Enforce usage of `@blur` over/in parallel with `@change` on select menu elements for accessibility. `@blur` **should** be used instead of `@change`, unless absolutely necessary and it causes no negative consequences for keyboard only or screen reader users. `@blur` is a more declarative action by the user: for instance in a dropdown, using the arrow keys to toggle between options will trigger the `@change` event in some browsers. Regardless, when a change of context results from an `@blur` event or an `@change` event, the user should be notified of the change unless it occurs below the currently focused element.

## 🔧 Options

This rule takes no arguments.

### ✔ Succeed

```vue
<template>
  <select @blur="handleBlur">
    <option />
  </select>

  <select>
    <option @blur="handleBlur" @change="handleChange" />
  </select>
</template>
```

### ❌ Fail

```vue
<template>
  <select @change="handleChange" />
</template>
```

## 📚 Resources

- [onChange Event Accessibility Issues](http://cita.disability.uiuc.edu/html-best-practices/auto/onchange.php)
- [onChange Select Menu](http://www.themaninblue.com/writing/perspective/2004/10/19/)
