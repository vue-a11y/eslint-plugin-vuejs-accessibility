import type { Rule } from "eslint";

import {
  defineTemplateBodyVisitor,
  getElementType,
  hasAriaLabel,
  hasContent,
  makeDocsURL,
  makeKebabCase
} from "../utils";

const rule: Rule.RuleModule = {
  meta: {
    docs: {
      url: makeDocsURL("anchor-has-content")
    },
    messages: {
      default:
        "Anchors must have content and the content must be accessible by a screen reader."
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
            items: { type: "string" },
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

        const elementTypes = ["a"].concat(components.map(makeKebabCase));
        const accessibleChildTypes = accessibleChildren.map(makeKebabCase);

        const elementType = getElementType(node);

        if (
          elementTypes.includes(elementType) &&
          !hasContent(node, accessibleChildTypes, accessibleDirectives) &&
          !hasAriaLabel(node)
        ) {
          context.report({ node: node as any, messageId: "default" });
        }
      }
    });
  }
};

export default rule;
