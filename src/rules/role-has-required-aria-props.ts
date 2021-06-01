import type { Rule } from "eslint";
import type { AST } from "vue-eslint-parser";
import { ARIARoleDefintionKey, dom, roles } from "aria-query";

import {
  defineTemplateBodyVisitor,
  getElementAttribute,
  getElementAttributeValue,
  getElementType,
  makeDocsURL
} from "../utils";

function hasAttributes(node: AST.VElement, names: string[]) {
  return names.every((name) => getElementAttribute(node, name) !== null);
}

const rule: Rule.RuleModule = {
  meta: {
    docs: {
      url: makeDocsURL("role-has-required-aria-props")
    },
    messages: {
      default: `Elements with the ARIA role "{{role}}" must have the following attributes defined: {{attributes}}`
    }
  },
  create(context) {
    return defineTemplateBodyVisitor(context, {
      VElement(node) {
        const elementType = getElementType(node);
        if (!dom.get(elementType)) {
          return;
        }

        const roleValue = getElementAttributeValue(node, "role");
        if (!roleValue || typeof roleValue !== "string") {
          return;
        }

        roleValue
          .toLowerCase()
          .split(" ")
          .forEach((role) => {
            if (!roles.has(role as any)) {
              return;
            }

            const requiredAttributes = Object.keys(
              roles.get(role as ARIARoleDefintionKey)!.requiredProps
            );

            if (!hasAttributes(node, requiredAttributes)) {
              context.report({
                node: node as any,
                messageId: "default",
                data: {
                  role: role.toLowerCase(),
                  attributes: requiredAttributes.join(", ").toLowerCase()
                }
              });
            }
          });
      }
    });
  }
};

export default rule;
