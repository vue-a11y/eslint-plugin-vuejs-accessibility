const {
  defineTemplateBodyVisitor,
  isAttributeWithValue,
  makeDocsURL
} = require("../utils");

const message = `\
No access key attribute allowed. Inconsistencies between keyboard shortcuts \
and keyboard comments used by screenreader and keyboard only users create \
a11y complications.`;

module.exports = {
  meta: {
    docs: {
      url: makeDocsURL("no-access-key")
    }
  },
  create(context) {
    return defineTemplateBodyVisitor(context, {
      VAttribute(node) {
        if (isAttributeWithValue(node, "accesskey")) {
          context.report({ node, message });
        }
      }
    });
  },
  message
};
