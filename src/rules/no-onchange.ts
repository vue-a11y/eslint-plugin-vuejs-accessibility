import type { Rule } from "eslint";

import {
  defineTemplateBodyVisitor,
  getElementType,
  hasOnDirective,
  makeDocsURL
} from "../utils";

const rule: Rule.RuleModule = {
  meta: {
    type: "problem",
    deprecated: true,
    docs: {
      url: makeDocsURL("no-onchange")
    },
    messages: {
      default:
        "@blur must be used instead of @change, unless absolutely necessary and it causes no negative consequences for keyboard only or screen reader users."
    },
    schema: []
  },
  create(context) {
    return defineTemplateBodyVisitor(context, {
      VElement(node) {
        if (!["select", "option"].includes(getElementType(node))) {
          return;
        }

        if (hasOnDirective(node, "change") && !hasOnDirective(node, "blur")) {
          context.report({ node: node as any, messageId: "default" });
        }
      }
    });
  }
};

export default rule;
