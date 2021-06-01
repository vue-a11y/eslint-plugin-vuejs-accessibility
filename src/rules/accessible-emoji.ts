import type { Rule } from "eslint";
import emojiRegex from "emoji-regex";

import {
  defineTemplateBodyVisitor,
  getElementAttributeValue,
  getElementType,
  hasAriaLabel,
  isAriaHidden,
  makeDocsURL
} from "../utils";

const rule: Rule.RuleModule = {
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
        if (node.value && emojiRegex().test(node.value)) {
          const element = node.parent;

          if (
            element.type === "VElement" &&
            !isAriaHidden(element) &&
            (!hasAriaLabel(element) ||
              getElementType(element) !== "span" ||
              getElementAttributeValue(element, "role") !== "img")
          ) {
            context.report({ node: node as any, messageId: "default" });
          }
        }
      }
    });
  }
};

export default rule;
