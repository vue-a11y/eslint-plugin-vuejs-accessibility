const getElementAttributeValue = require("./getElementAttributeValue");

const getElementType = (node) =>
  getElementAttributeValue(node, "is") || node.rawName;

module.exports = getElementType;
