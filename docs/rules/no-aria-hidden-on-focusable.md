# no-aria-hidden-on-focusbable

Enforce that `aria-hidden="true"` is not set on focusable elements or parent of focusable elements.

`aria-hidden="true"` can be used to hide purely decorative content from screen reader users. An element with `aria-hidden="true"` that can also be reached by keyboard can lead to confusion or unexpected behavior for screen reader users. Avoid using `aria-hidden="true"` on focusable elements.

 See more in [WAI-ARIA Use in HTML](https://www.w3.org/TR/using-aria/#fourth).


### ✔ Succeed
```vue
<template>
    <button>Press Me</button>
</template>
```

```vue
<template>
    <div aria-hidden='true'><button tabindex='-1'>Submit</button></div>
</template>
```


```vue
<template>
    <div aria-hidden='true'><span>Some text</div></div>
</template>
```

```vue
<template>
    <button tabindex='-1' aria-hidden='true'>Press</button>
</template>
```

```vue
<template>
    <div aria-hidden='true'><a href='#' tabindex='-1'>Link</a></div>
</template>
```

```vue
<template>
    <div aria-hidden='true'><span>Some text</div></div>
</template>
```

### ❌ Fail

```vue
<template>
  <button aria-hidden='true'>press me</button>
</template>
```

```vue
<template>
    <button aria-hidden="true">press me</button>
</template>
```
```vue
<template>
    <a href="#" aria-hidden='true'>press me</a>
</template>
```
```vue
<template>
    <div aria-hidden="true"> 
        <button>press me</button>
    </div>
</template>
```
```vue
<template>
    <span tabindex='0' aria-hidden='true'><em>Icon</em></span>
</template>
```
