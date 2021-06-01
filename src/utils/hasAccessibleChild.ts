import type { AST } from "vue-eslint-parser";

import getElementType from "./getElementType";
import isHiddenFromScreenReader from "./isHiddenFromScreenReader";

function hasAccessibleChild(
  node: AST.VElement,
  accessibleChildTypes: string[] = []
): boolean {
  return node.children.some((child) => {
    switch (child.type) {
      case "VText":
        return child.value.trim().length > 0;
      case "VElement": {
        const elementType = getElementType(child);

        return (
          accessibleChildTypes.includes(elementType) ||
          child.rawName === "slot" ||
          (!isHiddenFromScreenReader(child) &&
            hasAccessibleChild(child, accessibleChildTypes))
        );
      }
      case "VExpressionContainer":
        if (child.expression && child.expression.type === "Identifier") {
          return child.expression.name !== "undefined";
        }
        return true;
      default:
        return false;
    }
  });
}

export default hasAccessibleChild;
