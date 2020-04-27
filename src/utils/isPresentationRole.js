const getElementAttributeValue = require("./getElementAttributeValue");

const isPresentationRole = (node) => {
  const role = getElementAttributeValue(node, "role");
  return role && ["presentation", "none"].includes(role);
};

module.exports = isPresentationRole;
