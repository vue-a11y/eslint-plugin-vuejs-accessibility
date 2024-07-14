# no-role-presentaion-on-focusbable

Enforce that `role="presentation"` is not set on focusable elements or parent of focusbale elements.

`role="presentation` can be used to hide purely decorative content from screen reader users. An element with `role="presentation"` that can also be reached by keyboard can lead to confusion or unexpected behavior for screen reader users. Avoid using `role="presentation"` on focusable elements.

 See more in [WAI-ARIA Use in HTML](https://www.w3.org/TR/using-aria/#fourth).


### ✔ Succeed
```vue
<template>
    <button>Press Me</button>
</template>
```

```vue
<template>
    <div role="presentation"><button tabindex='-1'>Submit</button></div>
</template>
```


```vue
<template>
    <div role="presentation"><span>Some text</div></div>
</template>
```

```vue
<template>
    <button tabindex='-1' role="presentation">Press</button>
</template>
```

```vue
<template>
    <div role="presentation"><a href='#' tabindex='-1'>Link</a></div>
</template>
```

```vue
<template>
    <div role="presentation"><span>Some text</div></div>
</template>
```

### ❌ Fail

```vue
<template>
  <button role="presentation">press me</button>
</template>
```

```vue
<template>
    <button role="presentation">press me</button>
</template>
```
```vue
<template>
    <a href="#" role="presentation">press me</a>
</template>
```
```vue
<template>
    <div role="presentation"> 
        <button>press me</button>
    </div>
</template>
```
```vue
<template>
    <span tabindex='0' role="presentation"><em>Icon</em></span>
</template>
```