import { Rule } from "eslint";
import {
  defineTemplateBodyVisitor,
  getElementAttributeValue,
  hasOnDirectives,
  interactiveHandlers,
  isCustomComponent,
  isHiddenFromScreenReader,
  isInteractiveElement,
  isInteractiveRole,
  isPresentationRole,
  makeDocsURL
} from "../utils";

const rule: Rule.RuleModule = {
  meta: {
    type: "problem",
    docs: {
      url: makeDocsURL("no-static-element-interactions")
    },
    messages: {
      default:
        "Visible, non-interactive elements should not have an interactive handler."
    },
    schema: []
  },
  create(context: Rule.RuleContext): Rule.RuleListener {
    return defineTemplateBodyVisitor(context, {
      VElement(node) {
        const role = getElementAttributeValue(node, "role");

        if (
          isCustomComponent(node) ||
          isHiddenFromScreenReader(node) ||
          isPresentationRole(node)
        ) {
          return;
        }

        if (
          hasOnDirectives(node, interactiveHandlers) &&
          !isInteractiveElement(node) &&
          !isInteractiveRole(role)
        ) {
          context.report({ node, messageId: "default" });
        }
      }
    });
  }
};

export default rule;
