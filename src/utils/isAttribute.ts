import type { AST } from "vue-eslint-parser";

function isAttribute(node: AST.VAttribute | AST.VDirective, name: string) {
  if (!node.directive) {
    return node.key.name === name;
  }

  return (
    node.key.name.name === "bind" &&
    node.key.argument &&
    (node.key.argument.type === "VIdentifier" && node.key.argument.name === name)
  );
}

export default isAttribute;
