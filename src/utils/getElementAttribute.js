const getElementAttribute = (node, name) => {
  for (const attribute of node.startTag.attributes) {
    const { key } = attribute;

    if (
      (!attribute.directive && key.name === name) ||
      (attribute.directive &&
        key.name.name === "bind" &&
        key.argument.name === name)
    ) {
      return attribute;
    }
  }

  return null;
};

module.exports = getElementAttribute;
