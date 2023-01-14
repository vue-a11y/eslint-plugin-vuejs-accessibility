import { ARIARoleDefinitionKey, roles } from "aria-query";

function getInteractiveRoles() {
  const interactiveRoles: ARIARoleDefinitionKey[] = [];

  for (const [role, definition] of roles.entries()) {
    if (
      !definition.abstract &&
      definition.superClass.some((classes) => classes.includes("widget"))
    ) {
      interactiveRoles.push(role);
    }
  }

  return interactiveRoles;
}

export default getInteractiveRoles;
