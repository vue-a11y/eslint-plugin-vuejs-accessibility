const getAttributeValue = (node) => {
  const { key, value } = node;

  if (!value) {
    return null;
  }

  if (!node.directive) {
    return value.value;
  }

  if (key.name.name === "bind" && value.expression) {
    return value.type === "Literal" ? value.expression.value : value.expression;
  }

  return null;
};

module.exports = getAttributeValue;
