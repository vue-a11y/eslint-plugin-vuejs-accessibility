import type { AST } from "vue-eslint-parser";

import isHiddenFromScreenReader from "./isHiddenFromScreenReader";

function isAriaHidden(node: AST.VDocumentFragment | AST.VElement): boolean {
  if (node.type !== "VElement") {
    return false;
  }

  return isHiddenFromScreenReader(node) || isAriaHidden(node.parent);
};

export default isAriaHidden;
