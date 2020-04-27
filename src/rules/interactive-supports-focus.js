const { dom, roles } = require("aria-query");

const {
  defineTemplateBodyVisitor,
  getAttributeValue,
  getElementAttribute,
  getElementAttributeValue,
  getElementType,
  hasOnDirectives,
  isHiddenFromScreenReader,
  isInteractiveElement,
  isPresentationRole,
  makeDocsURL
} = require("../utils");

const interactiveRoles = [];

for (const [role, definition] of roles) {
  if (
    !definition.abstract &&
    definition.superClass.some((classes) => classes.includes("widget"))
  ) {
    interactiveRoles.push(role);
  }
}

const interactiveHandlers = [
  "click",
  "contextmenu",
  "dblclick",
  "doubleclick",
  "drag",
  "dragend",
  "dragenter",
  "dragexit",
  "dragleave",
  "dragover",
  "dragstart",
  "drop",
  "keydown",
  "keypress",
  "keyup",
  "mousedown",
  "mouseenter",
  "mouseleave",
  "mousemove",
  "mouseout",
  "mouseover",
  "mouseup"
];

const isDisabledElement = (node) =>
  getElementAttributeValue(node, "disabled") ||
  (getElementAttributeValue(node, "aria-disabled") || "").toString() === "true";

const hasInteractiveRole = (node) => {
  const roleValue = getElementAttributeValue(node, "role");
  if (typeof roleValue !== "string") {
    return false;
  }

  return roleValue
    .toLowerCase()
    .split(" ")
    .some((role) => roles.has(role) && interactiveRoles.includes(role));
};

const hasTabIndex = (node) => {
  const attribute = getElementAttribute(node, "tabindex");

  if (!attribute) {
    return false;
  }

  const value = getAttributeValue(attribute);

  if (["string", "number"].includes(typeof value)) {
    if (typeof value === "string" && value.length === 0) {
      return false;
    }
    return Number.isInteger(Number(value));
  }

  if (value === true || value === false) {
    return false;
  }

  return value === null;
};

module.exports = {
  meta: {
    docs: {
      url: makeDocsURL("interactive-supports-focus")
    },
    messages: {
      tabbable: `Elements with the "{{role}}" interactive role must be tabbable.`,
      focusable: `Elements with the "{{role}" interactive role must be focusable.`
    },
    schema: [
      {
        type: "object",
        properties: {
          tabbable: {
            type: "array",
            items: {
              type: "string",
              enum: interactiveRoles
            },
            uniqueItems: true,
            additionalItems: false
          }
        }
      }
    ]
  },
  create(context) {
    return defineTemplateBodyVisitor(context, {
      VElement(node) {
        if (
          dom.has(getElementType(node)) &&
          hasOnDirectives(node, interactiveHandlers) &&
          !hasTabIndex(node) &&
          !isDisabledElement(node) &&
          !isHiddenFromScreenReader(node) &&
          !isPresentationRole(node) &&
          hasInteractiveRole(node) &&
          !isInteractiveElement(node)
        ) {
          const role = getElementAttributeValue(node, "role");
          const { tabbable = [] } = context.options[0] || {};

          if (role && tabbable.includes(role)) {
            // Always tabbable, tabIndex = 0
            context.report({ node, messageId: "tabbable", data: { role } });
          } else {
            // Focusable, tabIndex = -1 or 0
            context.report({ node, messageId: "focusable", data: { role } });
          }
        }
      }
    });
  },
  interactiveHandlers,
  interactiveRoles
};
