import type { AST } from "vue-eslint-parser";

import getElementAttributeValue from "./getElementAttributeValue";
import makeKebabCase from "./makeKebabCase";

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
