import type { Rule } from "eslint";
import type { AST } from "vue-eslint-parser";

interface FormControlHasLabelOptions {
  labelComponents: string[];
}

import {
  defineTemplateBodyVisitor,
  getElementAttributeValue,
  getElementType,
  hasAriaLabel,
  isAriaHidden,
  makeDocsURL,
  makeKebabCase,
} from "../utils";

function isLabelElement(
  node:
    | AST.VElement
    | AST.VDocumentFragment
    | AST.VText
    | AST.VExpressionContainer,
  { labelComponents = [] }: FormControlHasLabelOptions
) {
  const allLabelComponents = labelComponents.map(makeKebabCase).concat("label");
  return node.type === "VElement" && allLabelComponents.includes(getElementType(node));
}

function hasLabelElement(node: AST.VElement, options: FormControlHasLabelOptions): boolean {
  const { parent } = node;

  return (
    [parent, ...parent.children].some((node) => isLabelElement(node, options)) ||
    (parent && parent.type === "VElement" && hasLabelElement(parent, options))
  );
}

const rule: Rule.RuleModule = {
  meta: {
    docs: {
      url: makeDocsURL("form-has-label")
    },
    messages: {
      default:
        "Each form element must have a programmatically associated label element."
    },
    schema: [
      {
        type: "object",
        properties: {
          labelComponents: {
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
    return defineTemplateBodyVisitor(context, {
      VElement(node) {
        const options = context.options[0] || {};
        const elementType = getElementType(node);

        if (!["input", "textarea", "select"].includes(elementType)) {
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
          !hasLabelElement(node, options)
        ) {
          context.report({ node: node as any, messageId: "default" });
        }
      }
    });
  }
};

export default rule;
