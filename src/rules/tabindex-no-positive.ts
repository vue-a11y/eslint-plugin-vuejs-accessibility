import type { Rule } from "eslint";

import {
  defineTemplateBodyVisitor,
  getLiteralAttributeValue,
  makeDocsURL
} from "../utils";

const rule: Rule.RuleModule = {
  meta: {
    type: "problem",
    docs: {
      url: makeDocsURL("tabindex-no-positive")
    },
    messages: {
      default: "Avoid positive integer values for tabindex."
    },
    schema: []
  },
  create(context) {
    return defineTemplateBodyVisitor(context, {
      VElement(node) {
        const tabIndex = getLiteralAttributeValue(node, "tabindex");

        if (tabIndex && +tabIndex > 0) {
          context.report({ node: node as any, messageId: "default" });
        }
      }
    });
  }
};

export default rule;
