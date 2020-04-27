const { aria } = require("aria-query");
const {
  defineTemplateBodyVisitor,
  getAttributeName,
  makeDocsURL
} = require("../utils");

module.exports = {
  meta: {
    docs: {
      url: makeDocsURL("aria-props")
    },
    messages: {
      default: "{{name}} This attribute is an invalid ARIA attribute."
    }
  },
  create(context) {
    return defineTemplateBodyVisitor(context, {
      VAttribute(node) {
        const name = getAttributeName(node);
        const lowered = name && name.toLowerCase();

        if (lowered && lowered.startsWith("aria-") && !aria.has(lowered)) {
          context.report({ node, messageId: "default", data: { name } });
        }
      }
    });
  }
};
