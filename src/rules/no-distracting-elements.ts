import type { Rule } from "eslint";

import {
  defineTemplateBodyVisitor,
  getElementType,
  makeDocsURL,
  makeKebabCase
} from "../utils";

const defaultElements = ["marquee", "blink"];

const rule: Rule.RuleModule = {
  meta: {
    docs: {
      url: makeDocsURL("no-distracting-elements")
    },
    messages: {
      default:
        "Do not use <{{elementType}}> elements as they can create visual accessibility issues and are deprecated."
    },
    schema: [
      {
        type: "object",
        elements: {
          type: "array",
          items: {
            type: "string",
            enum: defaultElements
          }
        }
      }
    ]
  },
  create(context) {
    return defineTemplateBodyVisitor(context, {
      VElement(node) {
        const { elements = defaultElements } = context.options[0] || {};
        const elementType = getElementType(node);

        if (elements.map(makeKebabCase).includes(elementType)) {
          context.report({
            node: node as any,
            messageId: "default",
            data: { elementType }
          });
        }
      }
    });
  }
};

export default rule;
