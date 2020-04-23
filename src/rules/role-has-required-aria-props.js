const { dom, roles } = require("aria-query");
const {
  defineTemplateBodyVisitor,
  getElementAttribute,
  getElementAttributeValue,
  getElementType,
  makeDocsURL
} = require("../utils");

const makeMessage = (role, requiredProps) => `\
Elements with the ARIA role "${role}" must have the following attributes \
defined: ${requiredProps}`;

const hasAttributes = (node, names) =>
  names.every((name) => getElementAttribute(node, name) !== null);

module.exports = {
  meta: {
    docs: {
      url: makeDocsURL("role-has-required-aria-props")
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

        roleValue
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
              const message = makeMessage(
                role.toLowerCase(),
                requiredAttributes.join(", ").toLowerCase()
              );

              context.report({ node, message });
            }
          });
      }
    });
  },
  makeMessage
};
