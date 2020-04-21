// Taken directly from eslint-plugin-vue
const defineTemplateBodyVisitor = (context, templateVisitor, scriptVisitor) => {
  if (context.parserServices.defineTemplateBodyVisitor === null) {
    context.report({
      loc: { line: 1, column: 0 },
      message:
        "Use the latest vue-eslint-parser. See also https://eslint.vuejs.org/user-guide/#what-is-the-use-the-latest-vue-eslint-parser-error"
    });

    return {};
  }

  return context.parserServices.defineTemplateBodyVisitor(
    templateVisitor,
    scriptVisitor
  );
};

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

const isAttribute = (node, name) => {
  const { key } = node;

  return (
    (!node.directive && key.name === name) ||
    (node.directive && key.name.name === "bind" && key.argument.name === name)
  );
};

const isAttributeWithValue = (node, name) => {
  const { key } = node;

  return (
    (isPlainValue(node) && key.name === name) ||
    (isBoundValue(node) && key.argument.name === name)
  );
};

const makeDocsURL = (name) =>
  `https://github.com/kddeisz/eslint-plugin-vue-accessibility/blob/master/docs/${name}.md"`;

module.exports = {
  defineTemplateBodyVisitor,
  getElementType,
  getLiteralAttributeValue,
  isAttribute,
  isAttributeWithValue,
  makeDocsURL
};
