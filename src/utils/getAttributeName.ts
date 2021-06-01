import type { AST } from "vue-eslint-parser";

function getAttributeName(node: AST.VAttribute | AST.VDirective) {
  if (!node.directive) {
    return node.key.name;
  }

  const { key } = node;
  if (key.name.name === "bind" && key.argument && key.argument.type === "VIdentifier") {
    return key.argument.name;
  }

  return null;
}

export default getAttributeName;
