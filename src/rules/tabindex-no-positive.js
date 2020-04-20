const { defineTemplateBodyVisitor } = require("../utils");

const isPlainLiteral = (attribute) => !attribute.directive && attribute.value;
const isBoundLiteral = (attribute) => (
  attribute.directive &&
    attribute.key.name.name === "bind" &&
    attribute.value &&
    attribute.value.expression &&
    attribute.value.expression.type === "Literal"
);

const getTabIndex = (node) => {
  for (const attribute of node.startTag.attributes) {
    if (isPlainLiteral(attribute) && attribute.key.name === "tabindex") {
      return attribute.value.value;
    }

    if (isBoundLiteral(attribute) && attribute.key.argument.name === "tabindex") {
      return attribute.value.expression.value;
    }
  }

  return null;
};

module.exports = {
  meta: {
    docs: {
      url: "https://github.com/kddeisz/eslint-plugin-vue-accessibility/blob/master/docs/tabindex-no-positive.md"
    }
  },
  create(context) {
    return defineTemplateBodyVisitor(context, {
      VElement(node) {
        const tabIndex = getTabIndex(node);
        if (+tabIndex <= 0) {
          return;
        }

        context.report({
          node,
          message: "Avoid positive integer values for tabIndex.",
        });
      }
    });
  }
};
