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

function getImplicitRoleSet(node: AST.VElement): any[] | null {
  for (const [elementRole, roleSet] of elementRoles.entries()) {
    if (matchesElementRole(node, elementRole)) {
      // The types for this are wrong, it's actually a string[]
      return roleSet as unknown as any[];
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

        if (implicitRoleSet.includes(explicitRole)) {
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
