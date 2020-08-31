const {
  defineTemplateBodyVisitor,
  getElementAttributeValue,
  getElementType,
  isHiddenFromScreenReader,
  makeDocsURL,
  makeKebabCase
} = require("../utils");

const controlTypes = ["input", "meter", "progress", "select", "textarea"];

const validateNesting = (node, options) =>
  node.children.some((child) => {
    const { allowChildren, controlComponents } = options;

    if (child.rawName === "slot") {
      return allowChildren;
    }

    if (child.type === "VElement") {
      return (
        !isHiddenFromScreenReader(child) &&
        (controlTypes
          .concat(controlComponents)
          .includes(getElementType(child)) ||
          validateNesting(child, options))
      );
    }

    return false;
  });

const validate = (node, rule, options) => {
  switch (rule) {
    case "nesting":
      return validateNesting(node, options);
    case "id":
      return getElementAttributeValue(node, "for");
    default:
      return false;
  }
};

const isValidLabel = (node, required, options) => {
  if (Array.isArray(required.some)) {
    return required.some.some((rule) => validate(node, rule, options));
  }

  if (Array.isArray(required.every)) {
    return required.every.every((rule) => validate(node, rule, options));
  }

  return validate(node, required, options);
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
          controlComponents: {
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
          controlComponents = [],
          required = { every: ["nesting", "id"] }
        } = context.options[0] || {};

        const options = {
          allowChildren,
          controlComponents: controlComponents.map(makeKebabCase)
        };

        if (
          ["label"].concat(components).includes(getElementType(node)) &&
          !isValidLabel(node, required, options)
        ) {
          context.report({ node, messageId: "default" });
        }
      }
    });
  }
};
