# iframe-has-title

`<iframe>` elements must have a unique title property to indicate its content to the user.

_References:_

1. [Deque University](https://dequeuniversity.com/rules/axe/1.1/frame-title)

## Rule details

This rule takes no arguments.

### Succeed

```vue
<iframe title="This is a unique title" />
<iframe :title="uniqueTitle" />
```

### Fail

```vue
<iframe />
<iframe title="" />
```
