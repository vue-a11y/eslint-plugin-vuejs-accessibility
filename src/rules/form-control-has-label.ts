import type { Rule } from "eslint";
import type { AST } from "vue-eslint-parser";

import {
  defineTemplateBodyVisitor,
  getElementAttributeValue,
  getElementType,
  hasAriaLabel,
  isAriaHidden,
  makeDocsURL
} from "../utils";

function isLabelElement(
  node:
    | AST.VElement
    | AST.VDocumentFragment
    | AST.VText
    | AST.VExpressionContainer
) {
  return node.type === "VElement" && getElementType(node) === "label";
}

function hasLabelElement(node: AST.VElement): boolean {
  const { parent } = node;

  return (
    [parent, ...parent.children].some(isLabelElement) ||
    (parent && parent.type === "VElement" && hasLabelElement(parent))
  );
}

const rule: Rule.RuleModule = {
  meta: {
    type: "problem",
    docs: {
      url: makeDocsURL("form-control-has-label")
    },
    messages: {
      default:
        "Each form element must have a programmatically associated label element."
    },
    schema: [
      {
        type: "object",
        properties: {
          controlComponents: {
            type: "array",
            items: {
              type: "string"
            },
            uniqueItems: true
          }
        }
      }
    ]
  },
  create(context) {
    const { controlComponents: customControlComponents = [] } =
      context.options[0] || {};

    const controlComponents = ["input", "textarea", ...customControlComponents];

    return defineTemplateBodyVisitor(context, {
      VElement(node) {
        const elementType = getElementType(node);
        if (!controlComponents.includes(elementType)) {
          return;
        }

        if (elementType === "input") {
          const type = getElementAttributeValue(node, "type");

          if (
            !type ||
            ["hidden", "button", "image", "submit", "reset"].includes(
              type as any
            )
          ) {
            return;
          }
        }

        if (
          !isAriaHidden(node) &&
          !hasAriaLabel(node) &&
          !hasLabelElement(node)
        ) {
          context.report({ node: node as any, messageId: "default" });
        }
      }
    });
  }
};

export default rule;
