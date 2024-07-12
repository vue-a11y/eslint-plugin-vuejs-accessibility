import type { Rule } from "eslint";
import type { AST } from "vue-eslint-parser";

import { defineTemplateBodyVisitor, getElementAttributeValue, makeDocsURL } from "../utils";

const focusableElements = [
    'button',
    'a',
    'input',
    'select',
    'textarea',
    '[tabindex]',
    '[contenteditable]'
];

const hasFocusableElements = (element: AST.VElement): boolean => {
    if (focusableElements.includes(element.name) || element.startTag.attributes.some(attr => focusableElements.includes(`[${attr.key.name}]`))) {
        if(getElementAttributeValue(element, 'tabindex') === '-1') {
            return false;
        }
        return true;
    }
    return element.children.some(child => child.type === `VElement` && hasFocusableElements(child));
};

const rule: Rule.RuleModule = {
    meta: {
        type: "problem",
        docs: {
            url: makeDocsURL("no-presentation-or-aria-hidden-on-focusable")
        },
        messages: {
            default: "Focusable/Interactive elements must not have a presentation role or aria-hidden attribute."
        },
        schema: []
    },
    create(context) {
        return defineTemplateBodyVisitor(context, {
            VElement(node) {
                const hasAriaHidden = getElementAttributeValue(node, 'aria-hidden');
                const hasRolePresentation = getElementAttributeValue(node, 'role') === 'presentation';
                if (hasAriaHidden || hasRolePresentation) {
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