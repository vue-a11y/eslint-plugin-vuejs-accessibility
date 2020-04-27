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

module.exports = hasAccessibleChild;
