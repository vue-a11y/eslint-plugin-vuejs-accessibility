const getElementAttributeValue = require("./getElementAttributeValue");
const makeKebabCase = require("./makeKebabCase");

const getElementType = (node) =>
  makeKebabCase(getElementAttributeValue(node, "is") || node.rawName);

module.exports = getElementType;
