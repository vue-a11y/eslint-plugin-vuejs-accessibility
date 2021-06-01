import type { AST } from "vue-eslint-parser";

import hasOnDirective from "./hasOnDirective";

function hasOnDirectives(node: AST.VElement, names: string[]) {
  return names.some((name) => hasOnDirective(node, name));
}

export default hasOnDirectives;
