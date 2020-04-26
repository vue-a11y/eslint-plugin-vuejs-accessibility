const { elementRoles } = require("aria-query");
const {
  defineTemplateBodyVisitor,
  getElementAttributeValue,
  getElementType,
  makeDocsURL,
  matchesElementRole
} = require("../utils");

const exceptions = { nav: ["navigation"] };
const makeMessage = (type, role) => `\
The element ${type} has an implicit role of ${role}. Defining this \
explicitly is redundant and should be avoided.`;

const getImplicitRoleSet = (node) => {
  for (const [elementRole, roleSet] of elementRoles) {
    if (matchesElementRole(node, elementRole)) {
      return roleSet;
    }
  }

  return null;
};

module.exports = {
  meta: {
    docs: {
      url: makeDocsURL("no-redundant-roles")
    },
    schema: [
      {
        type: "object",
        additionalProperties: {
          type: "array",
          items: {
            type: "string"
          },
          uniqueItems: true
        }
      }
    ]
  },
  create(context) {
    return defineTemplateBodyVisitor(context, {
      VElement(node) {
        const type = getElementType(node);
        const implicitRoleSet = getImplicitRoleSet(node);
        const explicitRole = getElementAttributeValue(node, "role");

        if (!implicitRoleSet || !explicitRole) {
          return;
        }

        const permittedRoles = context.options[0] || {};
        if (
          (permittedRoles[type] || [])
            .concat(exceptions[type] || [])
            .includes(explicitRole)
        ) {
          return;
        }

        if (implicitRoleSet.has(explicitRole)) {
          context.report({ node, message: makeMessage(type, explicitRole) });
        }
      }
    });
  },
  makeMessage
};
