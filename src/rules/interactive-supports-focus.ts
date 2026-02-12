import type { Rule } from "eslint";
import type { AST } from "vue-eslint-parser";
import { ARIARoleDefinitionKey, dom, roles } from "aria-query";

import {
  defineTemplateBodyVisitor,
  getAttributeValue,
  getElementAttribute,
  getElementAttributeValue,
  getElementType,
  hasOnDirectives,
  interactiveHandlers,
  isHiddenFromScreenReader,
  isInteractiveElement,
  isPresentationRole,
  makeDocsURL
} from "../utils";

const interactiveRoles: ARIARoleDefinitionKey[] = [];

for (const [role, definition] of roles.entries()) {
  if (
    !definition.abstract &&
    definition.superClass.some((classes) => classes.includes("widget"))
  ) {
    interactiveRoles.push(role);
  }
}

function isDisabledElement(node: AST.VElement) {
  return (
    getElementAttributeValue(node, "disabled") ||
    (getElementAttributeValue(node, "aria-disabled") || "").toString() ===
      "true"
  );
}

function isInteractiveRole(value: any): value is string {
  if (typeof value !== "string") {
    return false;
  }

  return value
    .toLowerCase()
    .split(" ")
    .some(
      (role) => roles.has(role as any) && interactiveRoles.includes(role as any)
    );
}

function hasTabIndex(node: AST.VElement) {
  const attribute = getElementAttribute(node, "tabindex");

  if (!attribute) {
    return false;
  }

  const value = getAttributeValue(attribute);

  if (["string", "number"].includes(typeof value)) {
    if (typeof value === "string" && value.length === 0) {
      return false;
    }
    return Number.isInteger(Number(value));
  }

  if (value === true || value === false) {
    return false;
  }

  return value === null;
}

export interface InteractiveSupportsFocus extends Rule.RuleModule {
  interactiveHandlers: string[];
  interactiveRoles: ARIARoleDefinitionKey[];
}

const rule: InteractiveSupportsFocus = {
  meta: {
    type: "problem",
    docs: {
      url: makeDocsURL("interactive-supports-focus")
    },
    messages: {
      tabbable: `Elements with the "{{role}}" interactive role must be tabbable.`,
      focusable: `Elements with the "{{role}}" interactive role must be focusable.`
    },
    schema: [
      {
        type: "object",
        properties: {
          tabbable: {
            type: "array",
            items: {
              type: "string",
              enum: interactiveRoles,
              default: [
                "button",
                "checkbox",
                "link",
                "searchbox",
                "spinbutton",
                "switch",
                "textbox"
              ]
            },
            uniqueItems: true,
            additionalItems: false
          }
        }
      }
    ]
  },
  create(context) {
    return defineTemplateBodyVisitor(context, {
      VElement(node) {
        const role = getElementAttributeValue(node, "role");

        if (
          dom.has(getElementType(node)) &&
          hasOnDirectives(node, interactiveHandlers) &&
          !hasTabIndex(node) &&
          !isDisabledElement(node) &&
          !isHiddenFromScreenReader(node) &&
          !isPresentationRole(node) &&
          isInteractiveRole(role) &&
          !isInteractiveElement(node)
        ) {
          const tabbable: string[] = (context.options[0] || {}).tabbable || [];

          if (tabbable.includes(role)) {
            // Always tabbable, tabIndex = 0
            context.report({
              node,
              messageId: "tabbable",
              data: { role }
            });
          } else {
            // Focusable, tabIndex = -1 or 0
            context.report({
              node,
              messageId: "focusable",
              data: { role }
            });
          }
        }
      }
    });
  },
  interactiveHandlers,
  interactiveRoles
};

export default rule;
