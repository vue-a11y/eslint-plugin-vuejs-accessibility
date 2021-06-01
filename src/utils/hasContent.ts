import type { AST } from "vue-eslint-parser";

import getElementAttributeValue from "./getElementAttributeValue";
import getElementType from "./getElementType";
import hasAccessibleChild from "./hasAccessibleChild";
import isHiddenFromScreenReader from "./isHiddenFromScreenReader";

function hasDirective(node: AST.VElement, name: string) {
  return node.startTag.attributes.some(
    (attribute) => attribute.directive && attribute.key.name.name === name
  );
}

function hasChildImageWithAlt(node: AST.VElement): boolean {
  return node.children.some((child) => {
    if (child.type === "VElement") {
      if (
        !isHiddenFromScreenReader(child) &&
        getElementType(child) === "img" &&
        getElementAttributeValue(child, "alt")
      ) {
        return true;
      }
      return hasChildImageWithAlt(child);
    }
  });
}

function hasContent(node: AST.VElement, accessibleChildTypes: string[]) {
  return (
    hasAccessibleChild(node, accessibleChildTypes) ||
    hasDirective(node, "text") ||
    hasDirective(node, "html") ||
    hasChildImageWithAlt(node)
  );
}

export default hasContent;
