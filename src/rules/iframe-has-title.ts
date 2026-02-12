import type { Rule } from "eslint";
import type { AST } from "vue-eslint-parser";

import {
  defineTemplateBodyVisitor,
  getElementAttributeValue,
  getElementType,
  makeDocsURL
} from "../utils";

const rule: Rule.RuleModule = {
  meta: {
    type: "problem",
    docs: {
      url: makeDocsURL("iframe-has-title")
    },
    messages: {
      default: "<iframe> elements must have a unique title property."
    },
    schema: []
  },
  create(context) {
    return defineTemplateBodyVisitor(context, {
      VElement(node: AST.VElement) {
        if (getElementType(node) !== "iframe") {
          return;
        }

        const title = getElementAttributeValue(node, "title");

        if (title === null || !["string", "object"].includes(typeof title)) {
          context.report({ node, messageId: "default" });
        }
      }
    });
  }
};

export default rule;
