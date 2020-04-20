module.exports = {
  // Taken directly from eslint-plugin-vue
  defineTemplateBodyVisitor(context, templateBodyVisitor, scriptVisitor) {
    if (context.parserServices.defineTemplateBodyVisitor == null) {
      context.report({
        loc: { line: 1, column: 0 },
        message: "Use the latest vue-eslint-parser. See also https://eslint.vuejs.org/user-guide/#what-is-the-use-the-latest-vue-eslint-parser-error"
      });

      return {};
    }

    return context.parserServices.defineTemplateBodyVisitor(templateBodyVisitor, scriptVisitor);
  }
};
