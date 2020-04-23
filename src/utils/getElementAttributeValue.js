const getAttributeValue = require("./getAttributeValue");
const getElementAttribute = require("./getElementAttribute");

const getElementAttributeValue = (node, name) => {
  const attribute = getElementAttribute(node, name);
  return attribute && getAttributeValue(attribute);
};

module.exports = getElementAttributeValue;
