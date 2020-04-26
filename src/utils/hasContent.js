const isHiddenFromScreenReader = require("./isHiddenFromScreenReader");

const hasAccessibleChild = (node) =>
  node.children.some((child) => {
    switch (child.type) {
      case "VText":
        return child.value.trim().length > 0;
      case "VElement":
        return !isHiddenFromScreenReader(child) && hasAccessibleChild(child);
      case "VExpressionContainer":
        if (child.expression && child.expression.type === "Identifier") {
          return child.expression.name !== "undefined";
        }
        return true;
      default:
        return false;
    }
  });

const hasDirective = (node, name) =>
  node.startTag.attributes.some(
    (attribute) => attribute.directive && attribute.key.name.name === name
  );

const hasContent = (node) =>
  hasAccessibleChild(node) ||
  hasDirective(node, "text") ||
  hasDirective(node, "html");

module.exports = hasContent;
