import type { Rule } from "eslint";

import {
  defineTemplateBodyVisitor,
  getElementAttributeValue,
  makeDocsURL
} from "../utils";

const rule: Rule.RuleModule = {
  meta: {
    type: "problem",
    docs: {
      url: makeDocsURL("no-access-key")
    },
    messages: {
      default:
        "No access key attribute allowed. Inconsistencies between keyboard shortcuts and keyboard comments used by screenreader and keyboard only users create a11y complications."
    },
    schema: []
  },
  create(context) {
    return defineTemplateBodyVisitor(context, {
      VElement(node) {
        if (getElementAttributeValue(node, "accesskey")) {
          context.report({ node, messageId: "default" });
        }
      }
    });
  }
};

export default rule;
