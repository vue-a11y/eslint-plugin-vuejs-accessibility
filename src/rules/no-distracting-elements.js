const {
  defineTemplateBodyVisitor,
  getElementType,
  makeDocsURL
} = require("../utils");

const defaultElements = ["marquee", "blink"];

module.exports = {
  meta: {
    docs: {
      url: makeDocsURL("no-distracting-elements")
    },
    schema: [
      {
        type: "object",
        elements: {
          type: "array",
          items: {
            type: "string",
            enum: defaultElements
          }
        }
      }
    ]
  },
  create(context) {
    return defineTemplateBodyVisitor(context, {
      VElement(node) {
        const { elements = defaultElements } = context.options[0] || {};
        const elementType = getElementType(node);

        if (elements.includes(elementType)) {
          context.report({
            node,
            message: `Do not use <${elementType}> elements as they can create visual accessibility issues and are deprecated.`
          });
        }
      }
    });
  }
};
