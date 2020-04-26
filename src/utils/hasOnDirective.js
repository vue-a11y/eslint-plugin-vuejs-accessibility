const hasOnDirective = (node, name) =>
  node.startTag.attributes.some((attribute) => {
    const { key, value } = attribute;

    return (
      attribute.directive &&
      key.name.name === "on" &&
      key.argument.name === name &&
      !!value.expression.body
    );
  });

module.exports = hasOnDirective;
