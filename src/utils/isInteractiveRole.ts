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
      (role: any) => roles.has(role) && getInteractiveRoles().includes(role)
    );
}

export default isInteractiveRole
