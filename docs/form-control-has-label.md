# form-control-has-label

Each form element must have a programmatically associated label element. You can do so by using an implicit `<label>`, explicit `<label>`, `aria-label` or `aria-labelledby`.

_References:_

1. [AXE](https://dequeuniversity.com/rules/axe/2.1/label)

## Rule details

### Succeed

```
<label><input type="text" /></label>
<input aria-label="test" type="text" />
<input aria-labelledby="#id" type="text" />
<label for="id"></label><input aria-labelledby="#id" id="id" />
<input type="image" />
```

### Fail

```
<input value="1" type="text" />
<textarea value="1"></textarea>
```
