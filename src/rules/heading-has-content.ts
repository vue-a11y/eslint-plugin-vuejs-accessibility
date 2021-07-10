import type { Rule } from "eslint";

import {
  defineTemplateBodyVisitor,
  getElementType,
  hasContent,
  makeDocsURL,
  makeKebabCase
} from "../utils";

const headings = ["h1", "h2", "h3", "h4", "h5", "h6"];

const rule: Rule.RuleModule = {
  meta: {
    docs: {
      url: makeDocsURL("heading-has-content")
    },
    messages: {
      default:
        "Headings must have content and the content must be accessible by a screen reader."
    },
    schema: [
      {
        type: "object",
        properties: {
          components: {
            type: "array",
            items: { type: "string" }
          },
          accessibleChildren: {
            type: "array",
            items: { type: "string" }
          },
          accessibleDirectives: {
            type: "array",
            items: { type: "string" }
          }
        }
      }
    ]
  },
  create(context) {
    return defineTemplateBodyVisitor(context, {
      VElement(node) {
        const { components = [], accessibleChildren = [], accessibleDirectives = [] } =
          context.options[0] || {};

        const elementTypes = headings.concat(components.map(makeKebabCase));
        const accessibleChildTypes = accessibleChildren.map(makeKebabCase);

        const elementType = getElementType(node);

        if (
          elementTypes.includes(elementType) &&
          !hasContent(node, accessibleChildTypes, accessibleDirectives)
        ) {
          context.report({ node: node as any, messageId: "default" });
        }
      }
    });
  }
};

export default rule;
