const getElementType = require("./getElementType");
const isHiddenFromScreenReader = require("./isHiddenFromScreenReader");

const hasAccessibleChild = (node, accessibleChildTypes = []) =>
  node.children.some((child) => {
    switch (child.type) {
      case "VText":
        return child.value.trim().length > 0;
      case "VElement": {
        const elementType = getElementType(child);

        return (
          accessibleChildTypes.includes(elementType) ||
          child.rawName === "slot" ||
          (!isHiddenFromScreenReader(child) &&
            hasAccessibleChild(child, accessibleChildTypes))
        );
      }
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
