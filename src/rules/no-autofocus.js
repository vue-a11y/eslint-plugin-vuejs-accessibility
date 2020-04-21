const { dom } = require("aria-query");
const {
  defineTemplateBodyVisitor,
  getElementType,
  isAttribute,
  makeDocsURL
} = require("../utils");

const message = `\
The autofocus prop should not be used, as it can reduce usability and \
accessibility for users.`;

module.exports = {
  meta: {
    docs: {
      url: makeDocsURL("no-autofocus")
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

        context.report({ node, message });
      }
    });
  },
  message
};
