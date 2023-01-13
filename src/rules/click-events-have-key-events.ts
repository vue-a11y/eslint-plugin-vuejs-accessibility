import type { Rule } from "eslint";

import {
  defineTemplateBodyVisitor,
  hasOnDirective,
  hasOnDirectives,
  isCustomComponent,
  isHiddenFromScreenReader,
  isInteractiveElement,
  isPresentationRole,
  makeDocsURL
} from "../utils";

const rule: Rule.RuleModule = {
  meta: {
    type: "problem",
    docs: {
      url: makeDocsURL("click-events-have-key-events")
    },
    messages: {
      default:
        "Visible, non-interactive elements with click handlers must have at least one keyboard listener."
    },
    schema: []
  },
  create(context) {
    return defineTemplateBodyVisitor(context, {
      VElement(node) {
        if (
          !isCustomComponent(node) &&
          hasOnDirective(node, "click") &&
          !isHiddenFromScreenReader(node) &&
          !isPresentationRole(node) &&
          !isInteractiveElement(node) &&
          !hasOnDirectives(node, ["keydown", "keyup", "keypress"])
        ) {
          context.report({ node: node as any, messageId: "default" });
        }
      }
    });
  }
};

export default rule;
