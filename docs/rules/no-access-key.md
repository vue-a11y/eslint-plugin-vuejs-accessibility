# no-access-key

Enforce no `accesskey` prop on element. Access keys are HTML attributes that allow web developers to assign keyboard shortcuts to elements. Inconsistencies between keyboard shortcuts and keyboard commands used by screenreader and keyboard-only users create accessibility complications. To avoid complications, access keys should not be used.

_References:_

1. [WebAIM](http://webaim.org/techniques/keyboard/accesskey#spec)

## Rule details

This rule takes no arguments.

### Succeed

```vue
<div>Stress reliever</div>
```

### Fail

```vue
<div accesskey="s">Stress reliever</div>
<div :accesskey="s">Stress reliever</div>
```
