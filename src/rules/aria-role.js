const { dom, roles } = require("aria-query");
const {
  defineTemplateBodyVisitor,
  getElementType,
  isAttribute,
  makeDocsURL
} = require("../utils");

const message =
  "Elements with ARIA roles must use a valid, non-abstract ARIA role.";

const getAttributeValue = (node) => {
  const { key, value } = node;

  if (!value) {
    return null;
  }

  if (!node.directive) {
    return value.value;
  }

  if (key.name.name === "bind" && value.expression) {
    return value.expression.value;
  }

  return null;
};

module.exports = {
  meta: {
    docs: {
      url: makeDocsURL("aria-role")
    },
    schema: [
      {
        type: "object",
        properties: {
          ignoreNonDOM: {
            type: "boolean"
          }
        },
        additionalProperties: false
      }
    ]
  },
  create(context) {
    return defineTemplateBodyVisitor(context, {
      VAttribute(node) {
        const { ignoreNonDOM } = context.options[0] || {};
        if (ignoreNonDOM && !dom.has(getElementType(node.parent.parent))) {
          return;
        }

        if (!isAttribute(node, "role")) {
          return;
        }

        const value = getAttributeValue(node);
        if (typeof value !== "string") {
          return;
        }

        const valid = value
          .toLowerCase()
          .split(" ")
          .every((role) => roles.has(role) && !roles.get(role).abstract);

        if (!valid) {
          context.report({ node, message });
        }
      }
    });
  },
  message
};
