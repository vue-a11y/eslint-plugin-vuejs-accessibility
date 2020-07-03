const {
  defineTemplateBodyVisitor,
  getElementAttributeValue,
  getElementType,
  isHiddenFromScreenReader,
  makeDocsURL
} = require("../utils");

const controlTypes = ["input", "meter", "progress", "select", "textarea"];

const validateNesting = (node, allowChildren) =>
  node.children.some((child) => {
    if (child.rawName === "slot") {
      return allowChildren;
    }

    if (child.type === "VElement") {
      return (
        !isHiddenFromScreenReader(child) &&
        (controlTypes.includes(getElementType(child)) ||
          validateNesting(child, allowChildren))
      );
    }

    return false;
  });

const validate = (node, rule, allowChildren) => {
  switch (rule) {
    case "nesting":
      return validateNesting(node, allowChildren);
    case "id":
      return getElementAttributeValue(node, "for");
    default:
      return false;
  }
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
    messages: {
      default: "Form label must have an associated control."
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
          context.report({ node, messageId: "default" });
        }
      }
    });
  }
};
