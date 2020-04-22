# heading-has-content

Enforce that heading elements (`h1`, `h2`, etc.) have content and that the content is accessible to screen readers. Accessible means that it is not hidden using the `aria-hidden` prop. Refer to the references to learn about why this is important.

_References:_

1.  [Deque University](https://dequeuniversity.com/rules/axe/1.1/empty-heading)

## Rule details

This rule takes one optional object argument of type object:

```json
{
  "rules": {
    "jsx-a11y/heading-has-content": [
      "error",
      {
        "components": ["MyHeading"]
      }
    ]
  }
}
```

For the `components` option, these strings determine which elements (**always including** `<h1>` thru `<h6>`) should be checked for having content. This is a good use case when you have a wrapper component that simply renders an `h1` element.

### Succeed

```vue
<h1>Heading Content!</h1>
<h1 v-html="msg"></h1>
```

### Fail

```vue
<h1></h1>
```
