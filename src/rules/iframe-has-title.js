const {
  defineTemplateBodyVisitor,
  getLiteralAttributeValue,
  makeDocsURL
} = require("../utils");

const message = "<iframe> elements must have a unique title property.";

module.exports = {
  meta: {
    docs: {
      url: makeDocsURL("iframe-has-title")
    }
  },
  create(context) {
    return defineTemplateBodyVisitor(context, {
      "VElement[name='iframe']"(node) {
        const title = getLiteralAttributeValue(node, "title");

        if (!["string", "object"].includes(typeof title)) {
          context.report({ node, message });
        }
      }
    });
  },
  message
};
