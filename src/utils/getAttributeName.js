const getAttributeName = (node) => {
  const { key } = node;

  if (!node.directive) {
    return key.name;
  }
  return key.name.name === "bind" && key.argument && key.argument.name;
};

module.exports = getAttributeName;
