import type { AST } from "vue-eslint-parser";

import getElementAttributeValue from "./getElementAttributeValue";
import makeKebabCase from "./makeKebabCase";

/**
 * Returns a kebab-normalized string representing the element node name
 * or, if the `is` attribute is a string, its value if present.
 * @example <div is="foo-bar"> => "foo-bar"
 * @example <foo-bar> => "foo-bar"
 * @example <div> => "div"
 */
function getElementType(node: AST.VElement) {
  let is = getElementAttributeValue(node, "is");

  // If we could not parse the `is` value into a simple literal, we're going to
  // have to ignore it because we're not smart enough to handle multiple values
  // yet.
  if (typeof is !== "string") {
    is = null;
  }

  return makeKebabCase(is || node.rawName);
}

export default getElementType;
