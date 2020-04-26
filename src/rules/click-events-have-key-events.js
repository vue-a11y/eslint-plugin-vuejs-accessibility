const vueEslintParser = require("vue-eslint-parser");

const {
  defineTemplateBodyVisitor,
  getElementAttribute,
  getElementAttributeValue,
  hasOnDirective,
  isHiddenFromScreenReader,
  isInteractiveElement,
  makeDocsURL
} = require("../utils");
const htmlElements = require("../utils/htmlElements.json");

const message = `Visible, non-interactive elements with click handlers must \
have at least one keyboard listener.`;

const isHtmlElementNode = (node) =>
  node.namespace === vueEslintParser.AST.NS.HTML;

const isCustomComponent = (node) =>
  (isHtmlElementNode(node) && !htmlElements.includes(node.rawName)) ||
  getElementAttribute(node, "is");

const isPresentationRole = (node) => {
  const role = getElementAttributeValue(node, "role");
  return role && ["presentation", "none"].includes(role);
};

const hasKeyEvent = (node) =>
  hasOnDirective(node, "keydown") ||
  hasOnDirective(node, "keyup") ||
  hasOnDirective(node, "keypress");

module.exports = {
  meta: {
    docs: {
      url: makeDocsURL("click-events-have-key-events")
    }
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
          !hasKeyEvent(node)
        ) {
          context.report({ node, message });
        }
      }
    });
  },
  message
};
