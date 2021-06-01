import type { AST } from "vue-eslint-parser";

import getElementAttributeValue from "./getElementAttributeValue";

function isPresentationRole(node: AST.VElement) {
  const role = getElementAttributeValue(node, "role");
  return role === "presentation" || role === "none";
}

export default isPresentationRole;
