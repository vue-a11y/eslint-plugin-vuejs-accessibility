const {
  defineTemplateBodyVisitor,
  getElementType,
  hasContent,
  makeDocsURL,
  makeKebabCase
} = require("../utils");

const headings = ["h1", "h2", "h3", "h4", "h5", "h6"];

module.exports = {
  meta: {
    docs: {
      url: makeDocsURL("heading-has-content")
    },
    messages: {
      default:
        "Headings must have content and the content must be accessible by a screen reader."
    },
    schema: [
      {
        type: "object",
        properties: {
          components: {
            type: "array",
            items: { type: "string" }
          },
          accessibleChildren: {
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
        const { components = [], accessibleChildren = [] } =
          context.options[0] || {};

        const elementTypes = headings.concat(components.map(makeKebabCase));
        const accessibleChildTypes = accessibleChildren.map(makeKebabCase);

        const elementType = getElementType(node);

        if (
          elementTypes.includes(elementType) &&
          !hasContent(node, accessibleChildTypes)
        ) {
          context.report({ node, messageId: "default" });
        }
      }
    });
  }
};
