const { dom, roles } = require("aria-query");
const {
  defineTemplateBodyVisitor,
  getElementAttribute,
  getElementAttributeValue,
  getElementType,
  makeDocsURL
} = require("../utils");

const hasAttributes = (node, names) =>
  names.every((name) => getElementAttribute(node, name) !== null);

module.exports = {
  meta: {
    docs: {
      url: makeDocsURL("role-has-required-aria-props")
    },
    messages: {
      default: `Elements with the ARIA role "{{role}}" must have the following attributes defined: {{attributes}}`
    }
  },
  create(context) {
    return defineTemplateBodyVisitor(context, {
      VElement(node) {
        const elementType = getElementType(node);
        if (!dom.get(elementType)) {
          return;
        }

        const roleValue = getElementAttributeValue(node, "role");
        if (!roleValue) {
          return;
        }

        const isValid = (value) =>
          value
            .toLowerCase()
            .split(" ")
            .forEach((role) => {
              if (!roles.has(role)) {
                return;
              }

              const requiredAttributes = Object.keys(
                roles.get(role).requiredProps
              );

              if (!hasAttributes(node, requiredAttributes)) {
                context.report({
                  node,
                  messageId: "default",
                  data: {
                    role: role.toLowerCase(),
                    attributes: requiredAttributes.join(", ").toLowerCase()
                  }
                });
              }
            });

        if (typeof roleValue !== "string") {
          // when it's a dynamic value ignore
          return;
        }

        isValid(roleValue);
      }
    });
  }
};
