const getElementAttributeValue = require("./getElementAttributeValue");
const makeKebabCase = require("./makeKebabCase");

const getElementType = (node) => {
  let is = getElementAttributeValue(node, "is");

  // If we could not parse the `is` value into a simple literal, we're going to
  // have to ignore it because we're not smart enough to handle multiple values
  // yet.
  if (typeof is !== "string") {
    is = null;
  }

  return makeKebabCase(is || node.rawName);
};

module.exports = getElementType;
