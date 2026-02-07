import type { AST } from "vue-eslint-parser";

function getAttributeValue(node: AST.VAttribute | AST.VDirective) {
  if (!node.value) {
    return null;
  }

  if (!node.directive) {
    return node.value.value;
  }

  if (node.key.name.name === "bind" && node.value.expression) {
    // <div :height="100" />
    if (node.value.expression.type === "Literal") {
      return node.value.expression.value;
    }

    if (node.value.expression.type === 'LogicalExpression') {
      const operator = node.value.expression.operator;
      let leftSideOfOperation;
      let rightSideOfOperation;

      if (node.value.expression.left.type === 'Literal') {
        leftSideOfOperation = node.value.expression.left.value;
      }

      if (node.value.expression.right.type === 'Literal') {
        rightSideOfOperation = node.value.expression.right.value;
      }

      return eval(`${leftSideOfOperation} ${operator} ${rightSideOfOperation}`);
    }

    // TODO we're effectively using this as just a placeholder to let rules know
    // that a value has been passed in for this attribute. We should replace
    // this with a stronger API to either explicitly handle all of the different
    // types of values or just return a special symbol or something else.
    return node.value.expression;
  }

  return null;
}

export default getAttributeValue;
