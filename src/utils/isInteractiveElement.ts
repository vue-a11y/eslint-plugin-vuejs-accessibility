import type { AST } from "vue-eslint-parser";
import { elementRoles, dom, roles } from "aria-query";

import getElementType from "./getElementType";
import matchesElementRole from "./matchesElementRole";

// "toolbar" does not descend from widget, but it does support
// aria-activedescendant, thus in practice we treat it as a widget.
const interactiveRoles = new Set(["toolbar"]);

for (const [name, definition] of roles) {
  if (
    !definition.abstract &&
    definition.superClass.some((classes) => classes.includes("widget"))
  ) {
    interactiveRoles.add(name);
  }
}

// We need to explicitly list that plain inputs are interactive, even if they
// don't have an explicit role.
const interactiveElements = [{ name: "input" }];

for (const [element, names] of elementRoles) {
  if ([...names].some((name) => interactiveRoles.has(name))) {
    interactiveElements.push(element);
  }
}

function isInteractiveElement(node: AST.VElement) {
  const elementType = getElementType(node);

  if (!dom.has(elementType)) {
    return false;
  }

  return interactiveElements.some((elementRole) =>
    matchesElementRole(node, elementRole)
  );
}

export default isInteractiveElement;
