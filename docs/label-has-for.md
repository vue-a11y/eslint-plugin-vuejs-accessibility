# label-has-for

Enforce label tags have associated control. There are two supported ways to associate a label with a control:

- nesting: by wrapping a control in a label tag
- id: by using the prop `for` as in `for=[ID of control]`

To fully cover 100% of assistive devices, you're encouraged to validate for both nesting and id.

## Rule details

This rule takes one optional object argument of type object:

```json
{
  "rules": {
    "vuejs-accessibility/label-has-for": [
      "error",
      {
        "components": ["VLabel"],
        "controlComponents": ["VInput"],
        "required": {
          "every": ["nesting", "id"]
        },
        "allowChildren": false
      }
    ]
  }
}
```

For the `components` option, these strings determine which elements (**always including** `<label>`) should be checked for having the `for` prop. This is a good use case when you have a wrapper component that simply renders a `label` element.

For the `controlComponents` option, these strings determine which elements should be counted as form control elements. By default, this includes `input`, `meter`, `progress`, `select`, and `textarea`. This is a good use case when you have a wrapper component that simplify renders a `input` element.

The `required` option (defaults to `"required": { "every": ["nesting", "id"] }`) determines which checks are activated. You're allowed to pass in one of the following types:

- string: must be one of the acceptable strings (`"nesting"` or `"id"`)
- object, must have one of the following properties:
  - some: an array of acceptable strings, will pass if ANY of the requested checks passed
  - every: an array of acceptable strings, will pass if ALL of the requested checks passed

The `allowChildren` option (defaults to `false`) determines whether default slot content is allowed to be passed into a `label` element. For example, the following pattern, by default, is not allowed:

```vue
<label>
  <slot />
</label>
```

However, if `allowChildren` is set to `true`, no error will be raised. If you want to pass in default slot content without raising an error because you cannot be sure what the default slot will render, then set `allowChildren` to `true`.

### Succeed

```vue
<label for="name">
  <input type="text" id="name" />
  Name
</label>
```

### Fail

```vue
<input type="text" id="name" />
<label>First Name</label>
```
