import type { Rule } from "eslint";
import type { AST } from "vue-eslint-parser";

interface LabelComponentsRequiredAttributes {
  name: string;
  requiredAttributes: string[];
}

interface FormControlHasLabelOptions {
  labelComponents: string[];
  labelComponentsWithRequiredAttributes: LabelComponentsRequiredAttributes[];
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
  { labelComponents = [] }: FormControlHasLabelOptions
) {
  const allLabelComponents: string[] = labelComponents.concat("label");
  return isMatchingElement(node, allLabelComponents);
}

function isLabelElementWithRequiredAttributes(
  node: | AST.VElement,
  { labelComponentsWithRequiredAttributes = [] }: FormControlHasLabelOptions
) {
  return labelComponentsWithRequiredAttributes.some((component) => (
    isMatchingElement(node, [component.name]) &&
    component.requiredAttributes.some(
      (attr) => getElementAttributeValue(node, attr)
    )
  ));
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
    (
      parent && parent.type === "VElement" &&
      (
        isLabelElementWithRequiredAttributes(parent, options) ||
        hasLabelElement(parent, options)
      )
    )
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
          labelComponentsWithRequiredAttributes: {
            type: "array",
            items: {
              type: "object",
              properties: {
                name: {
                  type: "string",
                },
                requiredAttributes: {
                  type: "array",
                  items: { type: "string" }
                },
              }
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
