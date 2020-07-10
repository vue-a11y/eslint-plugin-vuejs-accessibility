const emojiRegex = require("emoji-regex");
const {
  defineTemplateBodyVisitor,
  getElementAttributeValue,
  getElementType,
  hasAriaLabel,
  isHiddenFromScreenReader,
  makeDocsURL
} = require("../utils");

const isAriaHidden = (node) => {
  if (!node || node.type !== "VElement") {
    return false;
  }

  return isHiddenFromScreenReader(node) || isAriaHidden(node.parent);
};

module.exports = {
  meta: {
    docs: {
      url: makeDocsURL("accessible-emoji")
    },
    messages: {
      default: `Emojis should be wrapped in <span>, have role="img", and have an accessible description with aria-label or aria-labelledby.`
    }
  },
  create(context) {
    return defineTemplateBodyVisitor(context, {
      VText(node) {
        const { value } = node;

        if (value && emojiRegex().test(value)) {
          const element = node.parent;

          if (
            !isAriaHidden(element) &&
            (!hasAriaLabel(element) ||
              getElementType(element) !== "span" ||
              getElementAttributeValue(element, "role") !== "img")
          ) {
            context.report({ node, messageId: "default" });
          }
        }
      }
    });
  }
};
