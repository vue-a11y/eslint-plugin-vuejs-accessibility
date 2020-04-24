const { aria, dom } = require("aria-query");
const {
  defineTemplateBodyVisitor,
  getAttributeName,
  getElementType,
  makeDocsURL
} = require("../utils");

const makeMessage = (name) => `This element does not support ARIA roles, \
states, and properties. Try removing the prop "${name}".`;

module.exports = {
  meta: {
    docs: {
      url: makeDocsURL("aria-unsupported-elements")
    }
  },
  create(context) {
    return defineTemplateBodyVisitor(context, {
      VElement(node) {
        if (!(dom.get(getElementType(node)) || {}).reserved) {
          return;
        }

        node.startTag.attributes.forEach((attribute) => {
          const name = getAttributeName(attribute);

          if (aria.has(name) || name === "role") {
            context.report({ node, message: makeMessage(name) });
          }
        });
      }
    });
  },
  makeMessage
};
