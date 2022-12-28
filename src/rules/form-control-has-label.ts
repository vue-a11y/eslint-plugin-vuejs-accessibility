import type { Rule } from "eslint";
import type { AST } from "vue-eslint-parser";

interface FormControlHasLabelOptions {
  labelComponents: string[];
  labelComponentsWithLabel: string[];
}

import {
  defineTemplateBodyVisitor,
  getElementAttributeValue,
  getElementType,
  hasAriaLabel,
  isAriaHidden,
  isMatchingElement,
  makeDocsURL
} from "../utils";

function isLabelElement(
  node:
    | AST.VElement
    | AST.VDocumentFragment
    | AST.VText
    | AST.VExpressionContainer,
  { labelComponents = [], labelComponentsWithLabel = [] }: FormControlHasLabelOptions
) {
  if (!(node.type === "VElement")) return false;
  const allLabelComponents = labelComponents.concat("label");
  return (
    isMatchingElement(node, allLabelComponents)
    || (
      isMatchingElement(node, labelComponentsWithLabel)
      && (hasAriaLabel(node) || getElementAttributeValue(node, "label"))
    )
  );
}

function hasLabelElement(
  node: AST.VElement,
  options: FormControlHasLabelOptions
): boolean {
  const { parent } = node;

  return (
    [parent, ...parent.children].some((node) =>
      isLabelElement(node, options)
    ) ||
    (parent && parent.type === "VElement" && hasLabelElement(parent, options))
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
          labelComponents: {
            type: "array",
            items: {
              type: "string"
            },
            uniqueItems: true
          },
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
    return defineTemplateBodyVisitor(context, {
      VElement(node) {
        const options = context.options[0] || {};
        const controlComponents = [
          "input",
          "textarea",
          "select",
          ...(options.controlComponents || [])
        ];

        const elementType = getElementType(node);
        if (!controlComponents.includes(elementType)) {
          return;
        }

        if (elementType === "input") {
          const type = getElementAttributeValue(node, "type");
          const types = ["hidden", "button", "image", "submit", "reset"];

          if (!type || types.includes(type as any)) {
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
