const {
  defineTemplateBodyVisitor,
  getElementAttributeValue,
  getElementType,
  hasAccessibleChild,
  makeDocsURL
} = require("../utils");

const message = "Form label must have associated control";

const validate = (node, rule, allowChildren) => {
  if (allowChildren === true) {
    return hasAccessibleChild(node);
  }

  if (rule === "nesting") {
    return node.children.some((child) => child.type === "VElement");
  }

  return getElementAttributeValue(node, "for");
};

const isValidLabel = (node, required, allowChildren) => {
  if (Array.isArray(required.some)) {
    return required.some.some((rule) => validate(node, rule, allowChildren));
  }

  if (Array.isArray(required.every)) {
    return required.every.every((rule) => validate(node, rule, allowChildren));
  }

  return validate(node, required, allowChildren);
};

module.exports = {
  meta: {
    docs: {
      url: makeDocsURL("label-has-for")
    },
    schema: [
      {
        type: "object",
        properties: {
          components: {
            type: "array",
            items: {
              type: "string"
            },
            uniqueItems: true
          },
          required: {
            oneOf: [
              {
                type: "string",
                enum: ["nesting", "id"]
              },
              {
                type: "object",
                properties: {
                  some: {
                    type: "array",
                    items: {
                      type: "string",
                      enum: ["nesting", "id"]
                    },
                    uniqueItems: true
                  }
                },
                required: ["some"]
              },
              {
                type: "object",
                properties: {
                  every: {
                    type: "array",
                    items: {
                      type: "string",
                      enum: ["nesting", "id"]
                    },
                    uniqueItems: true
                  }
                },
                required: ["every"]
              }
            ]
          },
          allowChildren: {
            type: "boolean"
          }
        }
      }
    ]
  },
  create(context) {
    return defineTemplateBodyVisitor(context, {
      VElement(node) {
        const {
          allowChildren = false,
          components = [],
          required = { every: ["nesting", "id"] }
        } = context.options[0] || {};

        if (
          ["label"].concat(components).includes(getElementType(node)) &&
          !isValidLabel(node, required, allowChildren)
        ) {
          context.report({ node, message });
        }
      }
    });
  },
  message
};
