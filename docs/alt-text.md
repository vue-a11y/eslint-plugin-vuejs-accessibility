# alt-text

Enforce that all elements that require alternative text have meaningful information to relay back to the end user. This is a critical component of accessibility for screenreader users in order for them to understand the content's purpose on the page. By default, this rule checks for alternative text on the following elements: `<img>`, `<area>`, `<input type="image">`, and `<object>`.

_Resources:_

1. [aXe object-alt](https://dequeuniversity.com/rules/axe/2.1/object-alt)
2. [aXe image-alt](https://dequeuniversity.com/rules/axe/2.1/image-alt)
3. [aXe input-image-alt](https://dequeuniversity.com/rules/axe/2.1/input-image-alt)
4. [aXe area-alt](https://dequeuniversity.com/rules/axe/2.1/area-alt)

## How to resolve

### `<img>`

An `<img>` must have the `alt` prop set with meaningful text or as an empty string to indicate that it is an image for decoration.

For images that are being used as icons for a button or control, the `alt` prop should be set to an empty string (`alt=""`).

```vue
<button>
  <img src="icon.png" alt="" />
  Save
</button>
```

The content of an `alt` attribute is used to calculate the accessible label of an element, whereas the text content is used to produce a label for the element. For this reason, adding a label to an icon can produce a confusing or duplicated label on a control that already has appropriate text content.

### `<object>`

Add alternative text to all embedded `<object>` elements using either inner text, setting the `title` prop, or using the `aria-label` or `aria-labelledby` props.

### `<input type="image">`

All `<input type="image">` elements must have a non-empty `alt` prop set with a meaningful description of the image or have the `aria-label` or `aria-labelledby` props set.

### `<area>`

All clickable `<area>` elements within an image map have an `alt`, `aria-label` or `aria-labelledby` prop that describes the purpose of the link.

## Rule details

This rule takes one optional object argument of type object:

```json
{
  "rules": {
    "vuejs-accessibility/alt-text": [
      "error",
      {
        "elements": ["img", "object", "area", "input[type=\"image\"]"],
        "img": ["Image"],
        "object": ["Object"],
        "area": ["Area"],
        "input[type=\"image\"]": ["ImageInput"]
      }
    ]
  }
}
```

The `elements` option is a whitelist for DOM elements to check for alternative text. If an element is removed from the default set of elements (noted above), any custom components for that component will also be ignored. In order to indicate any custom wrapper components that should be checked, you can map the DOM element to an array of JSX custom components. This is a good use case when you have a wrapper component that simply renders an `img` element:

### Succeed

```vue
<img src="foo" alt="Foo eating a sandwich." />
<img src="foo" :alt="altText" />
<img src="foo" alt="" />

<object aria-label="foo" />
<object aria-labelledby="id1" />
<object>Meaningful description</object>
<object title="An object" />

<area aria-label="foo" />
<area aria-labelledby="id1" />
<area alt="This is descriptive!" />

<input type="image" alt="This is descriptive!" />
<input type="image" aria-label="foo" />
<input type="image" aria-labelledby="id1" />
```

### Fail

```vue
<img src="foo" />
<img alt />
<!-- Has no value -->
<img src="foo" role="presentation" />
<!-- Avoid ARIA if it can be achieved without -->
<img src="foo" role="none" />
<!-- Avoid ARIA if it can be achieved without -->

<object />
<area />
<input type="image" />
```
