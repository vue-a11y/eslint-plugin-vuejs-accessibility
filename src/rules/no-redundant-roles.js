const { elementRoles } = require("aria-query");
const {
  defineTemplateBodyVisitor,
  getElementAttributeValue,
  getElementType,
  makeDocsURL
} = require("../utils");

const exceptions = { nav: ["navigation"] };
const makeMessage = (type, role) => `\
The element ${type} has an implicit role of ${role}. Defining this \
explicitly is redundant and should be avoided.`;

const hasRoleAttributes = (node, attributes) =>
  attributes.every((attribute) => {
    const value = getElementAttributeValue(node, attribute.name);

    if (attribute.value) {
      return value === attribute.value;
    }

    if (attribute.constraints) {
      switch (attribute.constraints[0]) {
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

const getImplicitRoleSet = (node) => {
  const elementType = getElementType(node);

  for (const [key, value] of elementRoles) {
    if (key.name === elementType) {
      if (!key.attributes || hasRoleAttributes(node, key.attributes)) {
        return value;
      }
    }
  }
  return null;
};

module.exports = {
  getImplicitRoleSet,
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
