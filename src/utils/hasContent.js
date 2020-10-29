const getElementAttributeValue = require("./getElementAttributeValue");
const getElementType = require("./getElementType");
const hasAccessibleChild = require("./hasAccessibleChild");
const isHiddenFromScreenReader = require("./isHiddenFromScreenReader");

const hasDirective = (node, name) =>
  node.startTag.attributes.some(
    (attribute) => attribute.directive && attribute.key.name.name === name
  );

const hasChildImageWithAlt = (node) =>
  node.children.some((child) => {
    if (child.type === "VElement") {
      if (
        !isHiddenFromScreenReader(child) &&
        getElementType(child) === "img" &&
        getElementAttributeValue(child, "alt")
      ) {
        return true;
      }
      return hasChildImageWithAlt(child);
    }
  });

const hasContent = (node, accessibleChildTypes) =>
  hasAccessibleChild(node, accessibleChildTypes) ||
  hasDirective(node, "text") ||
  hasDirective(node, "html") ||
  hasChildImageWithAlt(node);

module.exports = hasContent;
