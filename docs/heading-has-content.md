# heading-has-content

Enforce that heading elements (`h1`, `h2`, etc.) have content and that the content is accessible to screen readers. Accessible means that it is not hidden using the `aria-hidden` prop. Refer to the references to learn about why this is important.

_References:_

1.  [Deque University](https://dequeuniversity.com/rules/axe/1.1/empty-heading)

## Rule details

This rule takes one optional object argument of type object:

```json
{
  "rules": {
    "vuejs-accessibility/heading-has-content": [
      "error",
      {
        "components": ["MyHeading"],
        "accessibleChildren": ["MyAccessibleText"]
      }
    ]
  }
}
```

For the `components` option, these strings determine which elements (**always including** `<h1>` thru `<h6>`) should be checked for having content. This is a good use case when you have a wrapper component that simply renders an `h1` element.

For the `accessibleChildren` option, these strings determine which elements should be marked as acceptably accessible child elements. For example if you have something like a `<trans tag="hello-world" />` child that you know will translate into accessible text, then you should put the `Trans` component into this array.

### Succeed

```vue
<h1>Heading Content!</h1>
<h1 v-html="msg"></h1>
<MyHeading>Heading Content!</MyHeading>
<h1>
  <MyAccessibleText />
</h1>
```

### Fail

```vue
<h1></h1>
<MyHeading></MyHeading>
```
