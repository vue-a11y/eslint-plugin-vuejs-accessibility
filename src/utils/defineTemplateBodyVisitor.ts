import type { Rule } from "eslint";
import type { AST } from "vue-eslint-parser";

interface TemplateListener extends Rule.NodeListener {
  VAttribute?: ((node: AST.VAttribute) => void);
  VElement?: ((node: AST.VElement) => void);
  VText?: ((node: AST.VText) => void);
}

// Taken directly from eslint-plugin-vue
function defineTemplateBodyVisitor(context: Rule.RuleContext, templateVisitor: TemplateListener, scriptVisitor?: Rule.RuleListener) {
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
}

export default defineTemplateBodyVisitor;
