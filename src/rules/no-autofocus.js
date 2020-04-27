const { dom } = require("aria-query");
const {
  defineTemplateBodyVisitor,
  getElementType,
  isAttribute,
  makeDocsURL
} = require("../utils");

module.exports = {
  meta: {
    docs: {
      url: makeDocsURL("no-autofocus")
    },
    messages: {
      default:
        "The autofocus prop should not be used, as it can reduce usability and accessibility for users."
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
        if (!isAttribute(node, "autofocus")) {
          return;
        }

        const { ignoreNonDOM } = context.options[0] || {};
        if (ignoreNonDOM && !dom.has(getElementType(node.parent.parent))) {
          return;
        }

        context.report({ node, messageId: "default" });
      }
    });
  }
};
