const {
  defineTemplateBodyVisitor,
  makeDocsURL,
  getElementType
} = require("../utils");

const message = `@blur must be used instead of @change, unless absolutely \
necessary and it causes no negative consequences for keyboard only or screen \
reader users.`;

const hasOnDirective = (node, name) =>
  node.startTag.attributes.some(
    (attribute) =>
      attribute.directive &&
      attribute.key.name.name === "on" &&
      attribute.key.argument.name === name
  );

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
