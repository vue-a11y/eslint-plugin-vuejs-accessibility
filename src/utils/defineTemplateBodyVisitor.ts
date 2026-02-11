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
    if (path.extname(getFilename(context)) === ".vue") {
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

// this ensures TypeScript is happy when using ESLint v9
declare module "eslint" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  export namespace Rule {
    export interface RuleContext {
      parserServices: SourceCode.ParserServices;
    }
  }
}

/**
 * This function is API compatible with eslint v8.x and eslint v9 or later.
 * @see https://eslint.org/blog/2023/09/preparing-custom-rules-eslint-v9/#context-methods-becoming-properties
 */
function getFilename(context: Rule.RuleContext) {
  return context.filename || context.getFilename();
}

/**
 * This function is API compatible with eslint v8.x and eslint v9 or later.
 * @see https://eslint.org/blog/2023/09/preparing-custom-rules-eslint-v9/#from-context-to-sourcecode
 */
function getParserServices(context: Rule.RuleContext) {
  const legacy = context.sourceCode;

  return legacy ? legacy.parserServices : context.parserServices;
}

export default defineTemplateBodyVisitor;
