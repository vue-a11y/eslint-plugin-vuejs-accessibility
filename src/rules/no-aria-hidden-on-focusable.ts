import type { Rule } from "eslint";

import { defineTemplateBodyVisitor, getElementAttributeValue, makeDocsURL } from "../utils";
import hasFocusableElements from "../utils/hasFocusableElement";

const rule: Rule.RuleModule = {
    meta: {
        type: "problem",
        docs: {
            url: makeDocsURL("no-aria-hidden-on-focusable")
        },
        messages: {
            default: "Focusable/Interactive elements must not have an aria-hidden attribute."
        },
        schema: []
    },
    create(context) {
        return defineTemplateBodyVisitor(context, {
            VElement(node) {
                const hasAriaHidden = getElementAttributeValue(node, 'aria-hidden');
                if (hasAriaHidden) {
                    if (hasFocusableElements(node)) {
                        context.report({
                            node: node as any,
                            messageId: 'default',
                        });
                    }
                }
            },
        });
    }
}

export default rule;
