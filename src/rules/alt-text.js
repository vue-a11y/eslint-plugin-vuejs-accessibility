const {
  defineTemplateBodyVisitor,
  getAttributeValue,
  getElementAttribute,
  getElementAttributeValue,
  getElementType,
  hasAccessibleChild,
  hasAriaLabel,
  isPresentationRole,
  makeDocsURL
} = require("../utils");

const messages = {
  area:
    "Each area of an image map must have a text alternative through the `alt`, `aria-label`, or `aria-labelledby` prop.",
  imgMissingAlt:
    "img elements must have an alt prop, either with meaningful text, or an empty string for decorative images.",
  imgInvalidAlt: `Invalid alt value for img. Use alt="" for presentational images.`,
  imgPresentation:
    'Prefer alt="" over a presentational role. First rule of aria is to not use aria if it can be achieved via native HTML.',
  input:
    '<input> elements with type="image" must have a text alternative through the `alt`, `aria-label`, or `aria-labelledby` prop.',
  object:
    "Embedded <object> elements must have alternative text by providing inner text, aria-label or aria-labelledby props."
};

const ruleByElement = {
  img(context, node) {
    const altAttribute = getElementAttribute(node, "alt");

    if (!altAttribute) {
      if (isPresentationRole(node)) {
        context.report({ node, message: messages.imgPresentation });
      } else {
        context.report({ node, message: messages.imgMissingAlt });
      }
    } else {
      const altValue = getAttributeValue(altAttribute);

      if (!altValue && altValue !== "") {
        context.report({ node, message: messages.imgInvalidAlt });
      }
    }
  },
  object(context, node) {
    if (
      !hasAriaLabel(node) &&
      !getElementAttributeValue(node, "title") &&
      !hasAccessibleChild(node)
    ) {
      context.report({ node, message: messages.object });
    }
  },
  area(context, node) {
    if (!hasAriaLabel(node) && !getElementAttributeValue(node, "alt")) {
      context.report({ node, message: messages.area });
    }
  },
  'input[type="image"]'(context, node) {
    if (
      getElementAttributeValue(node, "type") === "image" &&
      !hasAriaLabel(node) &&
      !getElementAttributeValue(node, "alt")
    ) {
      context.report({ node, message: messages.input });
    }
  }
};

module.exports = {
  meta: {
    docs: {
      url: makeDocsURL("alt-text")
    },
    schema: [
      {
        type: "object",
        properties: ["elements", ...Object.keys(ruleByElement)].reduce(
          (accum, key) =>
            Object.assign(accum, {
              [key]: {
                type: "array",
                items: {
                  type: "string"
                },
                uniqueItems: true
              }
            }),
          {}
        )
      }
    ]
  },
  create(context) {
    const options = context.options[0] || {};
    const { elements = Object.keys(ruleByElement) } = options;

    const elementTypes = new Set(
      elements.reduce(
        (accum, element) => [
          ...accum,
          element === 'input[type="image"]' ? "input" : element,
          ...(options[element] || [])
        ],
        []
      )
    );

    return defineTemplateBodyVisitor(context, {
      VElement(node) {
        let elementType = getElementType(node);
        if (!elementTypes.has(elementType)) {
          return;
        }

        if (elementType === "input") {
          elementType = 'input[type="image"]';
        }

        if (!elements.includes(elementType)) {
          elementType = elements.find((element) =>
            (options[element] || []).includes(elementType)
          );
        }

        ruleByElement[elementType](context, node);
      }
    });
  },
  messages
};
