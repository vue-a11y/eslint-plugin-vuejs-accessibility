const defineTemplateBodyVisitor = require("./utils/defineTemplateBodyVisitor");
const getAttributeName = require("./utils/getAttributeName");
const getAttributeValue = require("./utils/getAttributeValue");
const getElementAttribute = require("./utils/getElementAttribute");
const getElementAttributeValue = require("./utils/getElementAttributeValue");
const hasContent = require("./utils/hasContent");
const isAttribute = require("./utils/isAttribute");
const makeDocsURL = require("./utils/makeDocsURL");

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

const getElementType = (node) =>
  getLiteralAttributeValue(node, "is") || node.rawName;

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
  hasContent,
  isAttribute,
  isAttributeWithValue,
  makeDocsURL
};
