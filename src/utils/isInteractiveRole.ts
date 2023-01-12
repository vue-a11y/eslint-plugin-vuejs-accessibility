import { roles } from "aria-query";
import { getInteractiveRoles } from "../utils";

function isInteractiveRole(value: any): value is string {
  if (typeof value !== "string") {
    return false;
  }

  return value
    .toLowerCase()
    .split(" ")
    .some(
      (role) => roles.has(role as any) && getInteractiveRoles().includes(role as any)
    );
}

export default isInteractiveRole
