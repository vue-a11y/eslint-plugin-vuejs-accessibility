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
  const allLabelComponents = labelComponents.concat("label");
  return isMatchingElement(node, allLabelComponents);
}

function hasNestedLabelElement(
  node: AST.VElement,
  options: FormControlHasLabelOptions
): boolean {
  const { parent } = node;

  if (isLabelElement(parent, options)) {
    return true;
  }

  return (
    parent &&
    parent.type === "VElement" &&
    hasNestedLabelElement(parent, options)
  );
}

/**
 * Check if the form control at least has an "id" to be associated with a label
 * Can't really check for the label with a matching "for" attribute, because
 * checking every element in the file may lead to bad performance.
 */
function hasIdForLabelElement(node: AST.VElement): boolean {
  const id = getElementAttributeValue(node, "id");

  return Boolean(id);
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
          "meter",
          "output",
          "progress",
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
          !hasNestedLabelElement(node, options) &&
          !hasIdForLabelElement(node)
        ) {
          context.report({ node, messageId: "default" });
        }
      }
    });
  }
};

export default rule;
