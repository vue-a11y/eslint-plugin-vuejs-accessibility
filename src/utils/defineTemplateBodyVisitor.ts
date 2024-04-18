import path from "path";
import type { Rule } from "eslint";
import type { AST } from "vue-eslint-parser";

interface TemplateListener extends Rule.NodeListener {
  VAttribute?: (node: AST.VAttribute) => void;
  VElement?: (node: AST.VElement) => void;
  VText?: (node: AST.VText) => void;
}

// Taken directly from eslint-plugin-vue
function defineTemplateBodyVisitor(
  context: Rule.RuleContext,
  templateVisitor: TemplateListener,
  scriptVisitor?: Rule.RuleListener
) {
  const parserServices = getParserServices(context);
  if (!parserServices.defineTemplateBodyVisitor) {
    if (path.extname(context.getFilename()) === ".vue") {
      context.report({
        loc: { line: 1, column: 0 },
        message:
          "Use the latest vue-eslint-parser. See also https://eslint.vuejs.org/user-guide/#what-is-the-use-the-latest-vue-eslint-parser-error."
      });
    }

    return {};
  }

  return parserServices.defineTemplateBodyVisitor(
    templateVisitor,
    scriptVisitor
  );
}

/**
 * This function is API compatible with eslint v8.x and eslint v9 or later.
 * @see https://eslint.org/blog/2023/09/preparing-custom-rules-eslint-v9/#from-context-to-sourcecode
 */
function getParserServices(context: Rule.RuleContext) {
  // @ts-expect-error TODO: remove this when eslint v8 support is dropped
  return context.sourceCode
    ? context.sourceCode.parserServices
    : context.parserServices;
}

export default defineTemplateBodyVisitor;
