import type { AST } from "vue-eslint-parser";

import getElementType from "./getElementType";
import makeKebabCase from "./makeKebabCase";

function isMatchingElement(
  node:
    | AST.VElement
    | AST.VDocumentFragment
    | AST.VText
    | AST.VExpressionContainer,
  searchArray: string[]
) {
  if (!(node.type === "VElement")) return false;

  const elementType = getElementType(node);

  return searchArray.some((item: string) => {
    return makeKebabCase(item) === elementType;
  });
}

export default isMatchingElement;
