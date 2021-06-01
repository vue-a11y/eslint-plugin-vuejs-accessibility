import type { AST } from "vue-eslint-parser";

function hasOnDirective(node: AST.VElement, name: string) {
  return node.startTag.attributes.some((attribute) => {
    return (
      attribute.directive &&
      attribute.key.name.name === "on" &&
      attribute.key.argument &&
      attribute.key.argument.type === "VIdentifier" &&
      attribute.key.argument.name === name &&
      attribute.value &&
      attribute.value.expression &&
      (attribute.value.expression.type === "Identifier" ||
        !!(attribute.value.expression as any).body)
    );
  });
}

export default hasOnDirective;
