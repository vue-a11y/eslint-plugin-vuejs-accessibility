const { defineTemplateBodyVisitor } = require("../utils");

const makeMeta = (name) => ({
  docs: {
    url: `https://github.com/kddeisz/eslint-plugin-vue-accessibility/blob/master/docs/${name}.md`
  }
});

const isPlainLiteral = (attribute) => !attribute.directive && attribute.value;
const isBoundLiteral = (attribute) =>
  attribute.directive &&
  attribute.key.name.name === "bind" &&
  attribute.value &&
  attribute.value.expression &&
  attribute.value.expression.type === "Literal";

const getAttributeLiteral = (node, name) => {
  for (const attribute of node.startTag.attributes) {
    const { key, value } = attribute;

    if (isPlainLiteral(attribute) && key.name === name) {
      return value.value;
    }

    if (isBoundLiteral(attribute) && key.argument.name === name) {
      return value.expression.value;
    }
  }

  return null;
};

module.exports = {
  meta: makeMeta("tabindex-no-positive"),
  create(context) {
    return defineTemplateBodyVisitor(context, {
      VElement(node) {
        const tabIndex = getAttributeLiteral(node, "tabindex");

        if (tabIndex && +tabIndex > 0) {
          context.report({
            node,
            message: "Avoid positive integer values for tabindex."
          });
        }
      }
    });
  }
};
