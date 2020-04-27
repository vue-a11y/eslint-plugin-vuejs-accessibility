const {
  defineTemplateBodyVisitor,
  getElementType,
  hasContent,
  makeDocsURL
} = require("../utils");

module.exports = {
  meta: {
    docs: {
      url: makeDocsURL("anchor-has-content")
    },
    messages: {
      default:
        "Anchors must have content and the content must be accessible by a screen reader."
    },
    schema: [
      {
        type: "object",
        properties: {
          components: {
            type: "array",
            items: { type: "string" }
          }
        }
      }
    ]
  },
  create(context) {
    return defineTemplateBodyVisitor(context, {
      VElement(node) {
        const { components = [] } = context.options[0] || {};

        const elementTypes = ["a"].concat(components);
        const elementType = getElementType(node);

        if (elementTypes.includes(elementType) && !hasContent(node)) {
          context.report({ node, messageId: "default" });
        }
      }
    });
  }
};
