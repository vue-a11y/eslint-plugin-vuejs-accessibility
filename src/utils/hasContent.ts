import type { AST } from "vue-eslint-parser";

import getElementAttributeValue from "./getElementAttributeValue";
import getElementType from "./getElementType";
import hasAccessibleChild from "./hasAccessibleChild";
import isHiddenFromScreenReader from "./isHiddenFromScreenReader";

function hasDirective(node: AST.VElement, name: string) {
  return node.startTag.attributes.some(
    (attribute) =>
      attribute.directive && attribute.key.name.name === name.toLowerCase()
  );
}

function hasChildWithDirective(node: AST.VElement, name: string): boolean {
  return node.children.some((child) => {
    if (child.type !== "VElement") return false;

    if (hasDirective(child, name)) {
      return true;
    }

    return hasChildWithDirective(child, name)
  });
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

function hasAccessibleDirective(
  node: AST.VElement,
  accessibleDirectives: string[]
): boolean {
  return accessibleDirectives.some((directive) => {
    return hasDirective(node, directive);
  });
}

function hasContent(
  node: AST.VElement,
  accessibleChildTypes: string[],
  accessibleDirectives: string[]
) {
  return (
    hasAccessibleChild(node, accessibleChildTypes) ||
    hasAccessibleDirective(node, accessibleDirectives) ||
    hasDirective(node, "text") ||
    hasDirective(node, "html") ||
    hasChildWithDirective(node, "text") ||
    hasChildWithDirective(node, "html") ||
    hasChildImageWithAlt(node)
  );
}

export default hasContent;
