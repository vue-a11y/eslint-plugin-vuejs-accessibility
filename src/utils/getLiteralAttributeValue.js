const getLiteralAttributeValue = (node, name) => {
  for (const attribute of node.startTag.attributes) {
    const { key, value } = attribute;

    if (!attribute.directive && key.name === name && value) {
      return value.value;
    }

    if (
      attribute.directive &&
      key.name.name === "bind" &&
      key.argument &&
      key.argument.name === name &&
      value &&
      value.expression &&
      value.expression.type === "Literal"
    ) {
      return value.expression.value;
    }
  }

  return null;
};

module.exports = getLiteralAttributeValue;
