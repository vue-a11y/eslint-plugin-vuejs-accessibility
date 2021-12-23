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

function isAriaRoleDefinitionKey(role: any): role is ARIARoleDefintionKey {
  return roles.has(role);
}

const rule: Rule.RuleModule = {
  meta: {
    type: "problem",
    docs: {
      url: makeDocsURL("role-has-required-aria-props")
    },
    messages: {
      default: `Elements with the ARIA role "{{role}}" must have the following attributes defined: {{attributes}}`
    },
    schema: []
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
            if (isAriaRoleDefinitionKey(role)) {
              const roleDefinition = roles.get(role) as any;
              const requiredProps = Object.keys(roleDefinition.requiredProps);

              if (requiredProps && !hasAttributes(node, requiredProps)) {
                context.report({
                  node: node as any,
                  messageId: "default",
                  data: {
                    role: role.toLowerCase(),
                    attributes: requiredProps.join(", ").toLowerCase()
                  }
                });
              }
            }
          });
      }
    });
  }
};

export default rule;
