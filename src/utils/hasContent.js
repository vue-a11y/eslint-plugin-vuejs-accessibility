const hasAccessibleChild = require("./hasAccessibleChild");

const hasDirective = (node, name) =>
  node.startTag.attributes.some(
    (attribute) => attribute.directive && attribute.key.name.name === name
  );

const hasContent = (node) =>
  hasAccessibleChild(node) ||
  hasDirective(node, "text") ||
  hasDirective(node, "html");

module.exports = hasContent;
