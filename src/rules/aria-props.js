const { aria } = require("aria-query");
const {
  defineTemplateBodyVisitor,
  getAttributeName,
  makeDocsURL
} = require("../utils");

const makeMessage = (name) =>
  `${name}: This attribute is an invalid ARIA attribute.`;

module.exports = {
  meta: {
    docs: {
      url: makeDocsURL("aria-props")
    }
  },
  create(context) {
    return defineTemplateBodyVisitor(context, {
      VAttribute(node) {
        const name = getAttributeName(node);
        const lowered = name.toLowerCase();

        if (lowered.startsWith("aria-") && !aria.has(lowered)) {
          context.report({ node, message: makeMessage(name) });
        }
      }
    });
  },
  makeMessage
};
