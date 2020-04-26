const emojiRegex = require("emoji-regex");
const {
  defineTemplateBodyVisitor,
  getElementAttributeValue,
  getElementType,
  hasAriaLabel,
  makeDocsURL
} = require("../utils");

const message = `Emojis should be wrapped in <span>, have role="img", and have \
an accessible description with aria-label or aria-labelledby.`;

module.exports = {
  meta: {
    docs: {
      url: makeDocsURL("accessible-emoji")
    }
  },
  create(context) {
    return defineTemplateBodyVisitor(context, {
      VText(node) {
        const { value } = node;

        if (value && emojiRegex().test(value)) {
          const element = node.parent;

          if (
            !hasAriaLabel(element) ||
            getElementType(element) !== "span" ||
            getElementAttributeValue(element, "role") !== "img"
          ) {
            context.report({ node, message });
          }
        }
      }
    });
  },
  message
};
