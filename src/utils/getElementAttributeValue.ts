import type { AST } from "vue-eslint-parser";

import getAttributeValue from "./getAttributeValue";
import getElementAttribute from "./getElementAttribute";

function getElementAttributeValue(node: AST.VElement, name: string) {
  const attribute = getElementAttribute(node, name);
  return attribute && getAttributeValue(attribute);
}

export default getElementAttributeValue;
