import type { AST } from "vue-eslint-parser";

import getElementAttributeValue from "./getElementAttributeValue";

function hasAriaLabel(node: AST.VElement) {
  return (
    getElementAttributeValue(node, "aria-label") ||
    getElementAttributeValue(node, "aria-labelledby")
  );
}

export default hasAriaLabel;
