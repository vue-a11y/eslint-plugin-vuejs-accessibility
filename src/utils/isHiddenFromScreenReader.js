const getElementAttribute = require("./getElementAttribute");
const getAttributeValue = require("./getAttributeValue");

const isHiddenFromScreenReader = (node) => {
  const attribute = getElementAttribute(node, "aria-hidden");
  if (!attribute) {
    return false;
  }

  const value = getAttributeValue(attribute);
  return (value || "").toString() !== "false";
};

module.exports = isHiddenFromScreenReader;
