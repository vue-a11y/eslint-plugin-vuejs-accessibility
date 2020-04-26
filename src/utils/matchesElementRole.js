const getElementType = require("./getElementType");
const getElementAttributeValue = require("./getElementAttributeValue");

const matchesElementRole = (node, elementRole) => {
  const { name, attributes } = elementRole;
  if (name !== getElementType(node)) {
    return false;
  }

  return (attributes || []).every((attribute) => {
    const value = getElementAttributeValue(node, attribute.name);

    if (attribute.value) {
      return value === attribute.value;
    }

    if (attribute.constraints) {
      switch (attribute.constraints[0]) {
        case "set":
          return value;
        case "undefined":
          return !value;
        default:
          return null;
      }
    }

    return value;
  });
};

module.exports = matchesElementRole;
