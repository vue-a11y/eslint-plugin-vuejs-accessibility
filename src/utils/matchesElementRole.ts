import type { AST } from "vue-eslint-parser";
import type { ARIARoleRelationConcept } from "aria-query";

import getElementType from "./getElementType";
import getElementAttributeValue from "./getElementAttributeValue";

function matchesElementRole(
  node: AST.VElement,
  elementRole: ARIARoleRelationConcept
) {
  const { name, attributes } = elementRole;
  if (name !== getElementType(node)) {
    return false;
  }

  return (attributes || []).every((attribute) => {
    const value = getElementAttributeValue(node, attribute.name);

    if (attribute.value) {
      return value === attribute.value;
    }

    if (attribute.constraints) {
      // TODO: We shouldn't have to cast this to any. Are we using the wrong
      // comparison function here? Is this maybe for an old version of
      // aria-query?
      const constraint = attribute.constraints[0] as any;

      switch (constraint) {
        case "set":
          return value;
        case "undefined":
          return !value;
        default:
          return null;
      }
    }

    return value;
  });
}

export default matchesElementRole;
