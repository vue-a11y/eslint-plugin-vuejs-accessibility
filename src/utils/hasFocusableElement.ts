import type { AST } from 'vue-eslint-parser';
import getElementAttributeValue from './getElementAttributeValue';
import isInteractiveElement from './isInteractiveElement';

function hasFocusableElements(node: AST.VElement):boolean {
    const tabindex = getElementAttributeValue(node, 'tabindex');
    
    if(isInteractiveElement(node)) {
        return tabindex !== '-1';
    }

    if(tabindex !== null && tabindex !== '-1') {
        return true;
    }

    return node.children.some(child => child.type === 'VElement' && hasFocusableElements(child))
}

export default hasFocusableElements;
