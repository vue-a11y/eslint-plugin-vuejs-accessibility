const {
  defineTemplateBodyVisitor,
  getLiteralAttributeValue,
  makeDocsURL
} = require("../utils");

module.exports = {
  meta: {
    docs: {
      url: makeDocsURL("tabindex-no-positive")
    },
    messages: {
      default: "Avoid positive integer values for tabindex."
    }
  },
  create(context) {
    return defineTemplateBodyVisitor(context, {
      VElement(node) {
        const tabIndex = getLiteralAttributeValue(node, "tabindex");

        if (tabIndex && +tabIndex > 0) {
          context.report({ node, messageId: "default" });
        }
      }
    });
  }
};
