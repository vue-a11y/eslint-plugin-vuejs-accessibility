const { aria } = require("aria-query");
const { defineTemplateBodyVisitor, makeDocsURL } = require("../utils");

const getAttributeName = (node) => {
  const { key } = node;

  if (!node.directive) {
    return key.name;
  }
  return key.name.name === "bind" && key.argument.name;
};

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
