const isAttribute = (node, name) => {
  const { key } = node;

  return (
    (!node.directive && key.name === name) ||
    (node.directive && key.name.name === "bind" && key.argument.name === name)
  );
};

module.exports = isAttribute;
