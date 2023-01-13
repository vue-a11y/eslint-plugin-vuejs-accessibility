import { AST } from "vue-eslint-parser";
import htmlElements from "./htmlElements.json";
import { getElementAttribute } from "../utils";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const vueEslintParser = require("vue-eslint-parser");

function isHtmlElementNode(node: AST.VElement) {
  return node.namespace === vueEslintParser.AST.NS.HTML;
}

function isCustomComponent(node: AST.VElement) {
  return (
    (isHtmlElementNode(node) && !htmlElements.includes(node.rawName)) ||
    !!getElementAttribute(node, "is")
  );
}

export default isCustomComponent
