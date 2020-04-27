const defineTemplateBodyVisitor = require("./utils/defineTemplateBodyVisitor");
const getAttributeName = require("./utils/getAttributeName");
const getAttributeValue = require("./utils/getAttributeValue");
const getElementAttribute = require("./utils/getElementAttribute");
const getElementAttributeValue = require("./utils/getElementAttributeValue");
const getElementType = require("./utils/getElementType");
const hasAccessibleChild = require("./utils/hasAccessibleChild");
const hasAriaLabel = require("./utils/hasAriaLabel");
const hasContent = require("./utils/hasContent");
const hasOnDirective = require("./utils/hasOnDirective");
const hasOnDirectives = require("./utils/hasOnDirectives");
const isAttribute = require("./utils/isAttribute");
const isHiddenFromScreenReader = require("./utils/isHiddenFromScreenReader");
const isInteractiveElement = require("./utils/isInteractiveElement");
const isPresentationRole = require("./utils/isPresentationRole");
const makeDocsURL = require("./utils/makeDocsURL");
const matchesElementRole = require("./utils/matchesElementRole");

const isPlainValue = (attribute) => !attribute.directive && attribute.value;
const isBoundValue = (attribute) =>
  attribute.directive &&
  attribute.key.name.name === "bind" &&
  attribute.value &&
  attribute.value.expression;

const getLiteralAttributeValue = (node, name) => {
  for (const attribute of node.startTag.attributes) {
    const { key, value } = attribute;

    if (isPlainValue(attribute) && key.name === name) {
      return value.value;
    }

    if (
      isBoundValue(attribute) &&
      value.expression.type === "Literal" &&
      key.argument.name === name
    ) {
      return value.expression.value;
    }
  }

  return null;
};

const isAttributeWithValue = (node, name) => {
  const { key } = node;

  return (
    (isPlainValue(node) && key.name === name) ||
    (isBoundValue(node) && key.argument.name === name)
  );
};

module.exports = {
  defineTemplateBodyVisitor,
  getAttributeName,
  getAttributeValue,
  getElementAttribute,
  getElementAttributeValue,
  getElementType,
  getLiteralAttributeValue,
  hasAccessibleChild,
  hasAriaLabel,
  hasContent,
  hasOnDirective,
  hasOnDirectives,
  isAttribute,
  isAttributeWithValue,
  isHiddenFromScreenReader,
  isInteractiveElement,
  isPresentationRole,
  makeDocsURL,
  matchesElementRole
};
