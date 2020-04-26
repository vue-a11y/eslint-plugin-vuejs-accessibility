const hasOnDirective = (node, name) =>
  node.startTag.attributes.some(
    (attribute) =>
      attribute.directive &&
      attribute.key.name.name === "on" &&
      attribute.key.argument.name === name
  );

module.exports = hasOnDirective;
