const {
  defineTemplateBodyVisitor,
  getElementType,
  makeDocsURL
} = require("../utils");

const headings = ["h1", "h2", "h3", "h4", "h5", "h6"];
const message = `\
Headings must have content and the content must be accessible by a screen \
reader.`;

const getAttributeValue = (node, name) => {
  for (const attribute of node.startTag.attributes) {
    const { key, value } = attribute;

    if (!value) {
      continue;
    }

    if (!attribute.directive && key.name === name) {
      return value.value;
    }

    if (
      attribute.directive &&
      key.name.name === "bind" &&
      key.argument.name === name &&
      value.expression
    ) {
      return value.expression.value;
    }
  }

  return null;
};

const isHiddenFromScreenReader = (node) => {
  const ariaHidden = getAttributeValue(node, "aria-hidden");
  return ariaHidden && ariaHidden.toString() === "true";
};

const hasAccessibleChild = (node) =>
  node.children.some((child) => {
    switch (child.type) {
      case "VText":
        return child.value.trim().length > 0;
      case "VElement":
        return !isHiddenFromScreenReader(child) && hasAccessibleChild(child);
      case "VExpressionContainer":
        if (child.expression && child.expression.type === "Identifier") {
          return child.expression.name !== "undefined";
        }
        return true;
      default:
        return false;
    }
  });

const hasDirective = (node, name) =>
  node.startTag.attributes.some(
    (attribute) => attribute.directive && attribute.key.name.name === name
  );

const headingHasContent = (node) =>
  hasAccessibleChild(node) ||
  hasDirective(node, "text") ||
  hasDirective(node, "html");

module.exports = {
  meta: {
    docs: {
      url: makeDocsURL("heading-has-content")
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

        const elementTypes = headings.concat(components);
        const elementType = getElementType(node);

        if (elementTypes.includes(elementType) && !headingHasContent(node)) {
          context.report({ node, message });
        }
      }
    });
  },
  message
};
