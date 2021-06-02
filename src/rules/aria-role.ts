import type { Rule } from "eslint";
import { dom, roles } from "aria-query";

import {
  defineTemplateBodyVisitor,
  getAttributeValue,
  getElementType,
  isAttribute,
  makeDocsURL
} from "../utils";

function isValidRole(value: any) {
  const ariaRole = roles.get(value as any);
  return ariaRole && !ariaRole.abstract;
}

const rule: Rule.RuleModule = {
  meta: {
    docs: {
      url: makeDocsURL("aria-role")
    },
    messages: {
      default:
        "Elements with ARIA roles must use a valid, non-abstract ARIA role."
    },
    schema: [
      {
        type: "object",
        properties: {
          ignoreNonDOM: {
            type: "boolean",
            default: true
          }
        },
        additionalProperties: false
      }
    ]
  },
  create(context) {
    return defineTemplateBodyVisitor(context, {
      VAttribute(node) {
        const { ignoreNonDOM } = context.options[0] || {};
        if (ignoreNonDOM && !dom.has(getElementType(node.parent.parent))) {
          return;
        }

        if (!isAttribute(node, "role")) {
          return;
        }

        const value = getAttributeValue(node);
        if (typeof value !== "string") {
          return;
        }

        if (!value.toLowerCase().split(" ").every(isValidRole)) {
          context.report({ node: node as any, messageId: "default" });
        }
      }
    });
  }
};

export default rule;
