const getElementAttributeValue = require("./getElementAttributeValue");

const hasAriaLabel = (node) =>
  getElementAttributeValue(node, "aria-label") ||
  getElementAttributeValue(node, "aria-labelledby");

module.exports = hasAriaLabel;
