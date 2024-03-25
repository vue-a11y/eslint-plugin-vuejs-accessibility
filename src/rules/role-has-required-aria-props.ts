import type { Rule } from "eslint";
import type { AST } from "vue-eslint-parser";
import { ARIARoleDefinitionKey, dom, roles } from "aria-query";

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

function isAriaRoleDefinitionKey(role: any): role is ARIARoleDefinitionKey {
  return roles.has(role);
}

function filterRequiredPropsExceptions(
  node: AST.VElement,
  role: ARIARoleDefinitionKey,
  elementType: string,
  requiredProps: string[]
) {
  // Based on the pattern recommendation in https://www.w3.org/WAI/ARIA/apg/patterns/switch/#wai-ariaroles,states,andproperties
  // "aria-checked" should not be required.
  if (
    role.toLowerCase() === "switch" &&
    elementType === "input" &&
    getElementAttributeValue(node, "type") === "checkbox"
  ) {
    return requiredProps.filter((p) => p !== "aria-checked");
  }
  return requiredProps;
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
              const requiredProps = filterRequiredPropsExceptions(
                node,
                role,
                elementType,
                Object.keys(roleDefinition.requiredProps)
              );

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
