const {
  defineTemplateBodyVisitor,
  getElementType,
  hasOnDirective,
  makeDocsURL
} = require("../utils");

const message = `@blur must be used instead of @change, unless absolutely \
necessary and it causes no negative consequences for keyboard only or screen \
reader users.`;

module.exports = {
  meta: {
    docs: {
      url: makeDocsURL("no-onchange")
    }
  },
  create(context) {
    return defineTemplateBodyVisitor(context, {
      VElement(node) {
        if (!["select", "option"].includes(getElementType(node))) {
          return;
        }

        if (hasOnDirective(node, "change") && !hasOnDirective(node, "blur")) {
          context.report({ node, message });
        }
      }
    });
  },
  message
};
