import type { Rule } from "eslint";
import type { AST } from "vue-eslint-parser";
import { elementRoles } from "aria-query";

import {
  defineTemplateBodyVisitor,
  getElementAttributeValue,
  getElementType,
  makeDocsURL,
  matchesElementRole
} from "../utils";

const exceptions: { [type: string]: string[] } = { nav: ["navigation"] };

function getImplicitRoleSet(node: AST.VElement) {
  for (const [elementRole, roleSet] of elementRoles) {
    if (matchesElementRole(node, elementRole)) {
      return roleSet;
    }
  }

  return null;
}

const rule: Rule.RuleModule = {
  meta: {
    docs: {
      url: makeDocsURL("no-redundant-roles")
    },
    messages: {
      default:
        "The element {{type}} has an implicit role of {{role}}. Defining this explicitly is redundant and should be avoided."
    },
    schema: [
      {
        type: "object",
        additionalProperties: {
          type: "array",
          items: {
            type: "string"
          },
          uniqueItems: true
        }
      }
    ]
  },
  create(context) {
    return defineTemplateBodyVisitor(context, {
      VElement(node) {
        const type = getElementType(node);
        const implicitRoleSet = getImplicitRoleSet(node);
        const explicitRole = getElementAttributeValue(node, "role");

        if (!implicitRoleSet || !explicitRole) {
          return;
        }

        const permittedRoles = context.options[0] || {};
        if (
          (permittedRoles[type] || [])
            .concat(exceptions[type] || [])
            .includes(explicitRole)
        ) {
          return;
        }

        if (implicitRoleSet.has(explicitRole as any)) {
          context.report({
            node: node as any,
            messageId: "default",
            data: { type, role: explicitRole.toString() }
          });
        }
      }
    });
  }
};

export default rule;
