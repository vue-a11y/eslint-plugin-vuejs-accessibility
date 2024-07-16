import type { Rule } from "eslint";

import {
  defineTemplateBodyVisitor,
  getElementAttributeValue,
  makeDocsURL
} from "../utils";
import hasFocusableElements from "../utils/hasFocusableElement";

const rule: Rule.RuleModule = {
  meta: {
    type: "problem",
    docs: {
      url: makeDocsURL("no-role-presentation-on-focusable")
    },
    messages: {
      default:
        "Focusable/Interactive elements must not have a presentation role attribute."
    },
    schema: []
  },
  create(context) {
    return defineTemplateBodyVisitor(context, {
      VElement(node) {
        const hasRolePresentation =
          getElementAttributeValue(node, "role") === "presentation";
        if (hasRolePresentation && hasFocusableElements(node)) {
          context.report({
            node: node as any,
            messageId: "default"
          });
        }
      }
    });
  }
};

export default rule;
