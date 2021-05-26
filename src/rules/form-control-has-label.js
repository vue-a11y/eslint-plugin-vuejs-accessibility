const {
  defineTemplateBodyVisitor,
  getElementAttributeValue,
  getElementType,
  hasAriaLabel,
  isAriaHidden,
  makeDocsURL
} = require("../utils");

const isLabelElement = (node) =>
  node.type === "VElement" && getElementType(node) === "label";

const hasLabelElement = (node) => {
  const { parent } = node;

  return (
    [parent, ...parent.children].some(isLabelElement) ||
    (parent && parent.type === "VElement" && hasLabelElement(parent))
  );
};

module.exports = {
  meta: {
    docs: {
      url: makeDocsURL("form-has-label")
    },
    messages: {
      default:
        "Each form element must have a programmatically associated label element."
    }
  },
  create(context) {
    return defineTemplateBodyVisitor(context, {
      VElement(node) {
        const elementType = getElementType(node);
        if (!["input", "textarea"].includes(elementType)) {
          return;
        }

        if (elementType === "input") {
          const type = getElementAttributeValue(node, "type");

          if (
            !type ||
            ["hidden", "button", "image", "submit", "reset"].includes(type)
          ) {
            return;
          }
        }

        if (
          !isAriaHidden(node) &&
          !hasAriaLabel(node) &&
          !hasLabelElement(node)
        ) {
          context.report({ node, messageId: "default" });
        }
      }
    });
  }
};
