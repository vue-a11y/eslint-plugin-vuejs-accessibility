# anchor-has-content

Enforce that anchors have content and that the content is accessible to screen readers. Accessible means that it is not hidden using the `aria-hidden` prop. Refer to the references to learn about why this is important.

_References:_

1. [Deque University](https://dequeuniversity.com/rules/axe/1.1/link-name)

## Rule details

This rule takes one optional object argument of type object:

```json
{
  "rules": {
    "vuejs-accessibility/anchor-has-content": [
      "error",
      {
        "components": ["Anchor"],
        "accessibleChildren": ["MyAccessibleText"],
        "accessibleDirectives": ["myAccessibleDirective"]
      }
    ]
  }
}
```

For the `components` option, these strings determine which elements (**always including** `<a>`) should be checked for having content. This is a good use case when you have a wrapper component that simply renders an `a` element.

For the `accessibleChildren` option, these strings determine which elements should be marked as acceptably accessible child elements. For example if you have something like a `<trans tag="hello-world" />` child that you know will translate into accessible text, then you should put the `Trans` component into this array.

For the `accessibleDirectives` option, these strings declare an element should be marked as acceptably accessible if a directive is present. For example something like `<a href="#" v-bb="myBBCode" />` may provide content in the same way `v-html` would. You would add `bb` into this array. _Notice these strings should not include the `v-` prefix._

### Succeed

<!-- prettier-ignore -->
```vue
<a>Anchor Content!</a>
<a><TextWrapper /><a>
<a is="TextWrapper" />
<a v-text="msg" />
<a v-html="msg" />
<a v-myAccessibleDirective="msg" />
<Anchor>Anchor content</!Anchor>
<a><my-accessible-text /></a>
```

### Fail

```vue
<a />
<a><TextWrapper aria-hidden /></a>
<Anchor></Anchor>
```
