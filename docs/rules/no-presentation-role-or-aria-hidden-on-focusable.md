# no-presentaion-or-aria-hidden-on-focusbable

Elements cannot use role='presentation' or aria-hidden='true' on focusable element. Using either of these on a focusable element or parent of a focusbale element will result in some users focusing on 'nothing'. See more in [WAI-ARIA Use in HTML](https://www.w3.org/TR/using-aria/#fourth).


### ✔ Succeed
```vue
<template>
    <button>Press Me</button>
</template>
```

```vue
<template>
    <div><button>Submit</button></div>
</template>
```


```vue
<template>
    <div aria-hidden='true'><span>Some text</div></div>
</template>
```

```vue
<template>
    <button tabindex='-1' aria-hidden='true' role='presentation'>Press</button>
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
  <button role=presentation>press me</button>
</template>
```

```vue
<template>
    <button aria-hidden="true">press me</button>
</template>
```
```vue
<template>
    <a href="#" role='presentation'>press me</a>
</template>
```
```vue
<template>
    <div aria-hidden="true"> 
        <button>press me</button>
    </div>
</template>
```