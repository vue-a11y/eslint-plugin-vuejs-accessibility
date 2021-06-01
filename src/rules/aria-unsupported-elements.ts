import type { Rule } from "eslint";
import { aria, dom } from "aria-query";

import {
  defineTemplateBodyVisitor,
  getAttributeName,
  getElementType,
  makeDocsURL
} from "../utils";

const rule: Rule.RuleModule = {
  meta: {
    docs: {
      url: makeDocsURL("aria-unsupported-elements")
    },
    messages: {
      default: `This element does not support ARIA roles, states, and properties. Try removing the "{{name}}" attribute.`
    }
  },
  create(context) {
    return defineTemplateBodyVisitor(context, {
      VElement(node) {
        if (!(dom.get(getElementType(node)) || {}).reserved) {
          return;
        }

        node.startTag.attributes.forEach((attribute) => {
          const name = getAttributeName(attribute);

          if (name && (aria.has(name as any) || name === "role")) {
            context.report({
              node: node as any,
              messageId: "default",
              data: { name }
            });
          }
        });
      }
    });
  }
};

export default rule;
