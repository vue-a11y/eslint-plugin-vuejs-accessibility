const {
  defineTemplateBodyVisitor,
  getElementType,
  hasOnDirective,
  makeDocsURL
} = require("../utils");

module.exports = {
  meta: {
    docs: {
      url: makeDocsURL("no-onchange")
    },
    messages: {
      default:
        "@blur must be used instead of @change, unless absolutely necessary and it causes no negative consequences for keyboard only or screen reader users."
    }
  },
  create(context) {
    return defineTemplateBodyVisitor(context, {
      VElement(node) {
        if (!["select", "option"].includes(getElementType(node))) {
          return;
        }

        if (hasOnDirective(node, "change") && !hasOnDirective(node, "blur")) {
          context.report({ node, messageId: "default" });
        }
      }
    });
  }
};
