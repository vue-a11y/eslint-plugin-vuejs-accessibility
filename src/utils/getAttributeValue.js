const getAttributeValue = (node) => {
  const { key, value } = node;

  if (!value) {
    return null;
  }

  if (!node.directive) {
    return value.value;
  }

  if (key.name.name === "bind" && value.expression) {
    // <div :height="100" />
    if (value.expression.type === "Literal") {
      return value.expression.value;
    }

    // TODO we're effectively using this as just a placeholder to let rules know
    // that a value has been passed in for this attribute. We should replace
    // this with a stronger API to either explicitly handel all of the different
    // types of values or just return a special symbol or something else.
    return value.expression;
  }

  return null;
};

module.exports = getAttributeValue;
