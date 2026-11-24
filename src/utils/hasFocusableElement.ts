import type { AST } from "vue-eslint-parser";
import getElementAttributeValue from "./getElementAttributeValue";
import getElementType from "./getElementType";
import isInteractiveElement from "./isInteractiveElement";

function getTabindex(node: AST.VElement) {
  const tabindex = getElementAttributeValue(node, "tabindex");

  // :tabindex="-1" is parsed as a unary minus applied to the literal 1
  if (
    tabindex &&
    typeof tabindex === "object" &&
    "type" in tabindex &&
    tabindex.type === "UnaryExpression" &&
    tabindex.operator === "-" &&
    tabindex.argument.type === "Literal"
  ) {
    return `-${tabindex.argument.value}`;
  }

  return tabindex;
}

function hasFocusableElements(node: AST.VElement): boolean {
  if (
    getElementType(node) === "input" &&
    getElementAttributeValue(node, "type") === "hidden"
  ) {
    return false;
  }

  const tabindex = getTabindex(node);

  if (isInteractiveElement(node)) {
    return tabindex !== "-1";
  }

  if (tabindex !== null && tabindex !== "-1") {
    return true;
  }

  return node.children.some(
    (child) => child.type === "VElement" && hasFocusableElements(child)
  );
}

export default hasFocusableElements;
