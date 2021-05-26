const isHiddenFromScreenReader = require("./isHiddenFromScreenReader");

const isAriaHidden = (node) => {
  if (!node || node.type !== "VElement") {
    return false;
  }

  return isHiddenFromScreenReader(node) || isAriaHidden(node.parent);
};

module.exports = isAriaHidden;
