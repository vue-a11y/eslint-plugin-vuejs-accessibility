const {
  defineTemplateBodyVisitor,
  getLiteralAttributeValue,
  makeDocsURL
} = require("../utils");

const message = "Avoid positive integer values for tabindex.";

module.exports = {
  meta: {
    docs: {
      url: makeDocsURL("tabindex-no-positive")
    }
  },
  create(context) {
    return defineTemplateBodyVisitor(context, {
      VElement(node) {
        const tabIndex = getLiteralAttributeValue(node, "tabindex");

        if (tabIndex && +tabIndex > 0) {
          context.report({ node, message });
        }
      }
    });
  },
  message
};
