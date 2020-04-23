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

module.exports = defineTemplateBodyVisitor;
