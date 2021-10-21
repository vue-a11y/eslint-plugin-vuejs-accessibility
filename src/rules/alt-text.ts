import type { Rule } from "eslint";
import type { AST } from "vue-eslint-parser";

import {
  defineTemplateBodyVisitor,
  getAttributeValue,
  getElementAttribute,
  getElementAttributeValue,
  getElementType,
  hasAccessibleChild,
  hasAriaLabel,
  isPresentationRole,
  makeDocsURL,
  makeKebabCase
} from "../utils";

type ElementRule = (context: Rule.RuleContext, node: AST.VElement) => void;
type RuleByElement = { [key: string]: ElementRule };

const ruleByElement: RuleByElement = {
  img(context, node) {
    const altAttribute = getElementAttribute(node, "alt");

    if (!altAttribute) {
      if (isPresentationRole(node)) {
        context.report({ node: node as any, messageId: "imgPresentation" });
      } else {
        context.report({ node: node as any, messageId: "imgMissingAlt" });
      }
    } else {
      const altValue = getAttributeValue(altAttribute);

      if (!altValue && altValue !== "") {
        context.report({ node: node as any, messageId: "imgInvalidAlt" });
      }
    }
  },
  object(context, node) {
    if (
      !hasAriaLabel(node) &&
      !getElementAttributeValue(node, "title") &&
      !hasAccessibleChild(node)
    ) {
      context.report({ node: node as any, messageId: "object" });
    }
  },
  area(context, node) {
    if (!hasAriaLabel(node) && !getElementAttributeValue(node, "alt")) {
      context.report({ node: node as any, messageId: "area" });
    }
  },
  'input[type="image"]'(context, node) {
    if (
      getElementAttributeValue(node, "type") === "image" &&
      !hasAriaLabel(node) &&
      !getElementAttributeValue(node, "alt")
    ) {
      context.report({ node: node as any, messageId: "input" });
    }
  }
};

const rule: Rule.RuleModule = {
  meta: {
    docs: {
      url: makeDocsURL("alt-text")
    },
    messages: {
      area: "Each area of an image map must have a text alternative through the `alt`, `aria-label`, or `aria-labelledby` prop.",
      imgMissingAlt:
        "img elements must have an alt prop, either with meaningful text, or an empty string for decorative images.",
      imgInvalidAlt: `Invalid alt value for img. Use alt="" for presentational images.`,
      imgPresentation: `Prefer alt="" over a presentational role. First rule of aria is to not use aria if it can be achieved via native HTML.`,
      input: `<input> elements with type="image" must have a text alternative through the alt, aria-label, or aria-labelledby prop.`,
      object:
        "Embedded <object> elements must have alternative text by providing inner text, aria-label or aria-labelledby props."
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
    const elements: string[] = options.elements || Object.keys(ruleByElement);

    // Here we're building up a list of element types and their corresponding
    // check function.
    const elementTypes: Record<string, keyof typeof ruleByElement> = {};

    elements.forEach((element) => {
      const elementKey = element === 'input[type="image"]' ? "input" : element;
      elementTypes[elementKey] = element;

      (options[element] || []).forEach((matchedElement: string) => {
        elementTypes[makeKebabCase(matchedElement)] = elementKey;
      });
    });

    return defineTemplateBodyVisitor(context, {
      VElement(node) {
        const elementType = elementTypes[getElementType(node)];
        elementType && ruleByElement[elementType](context, node);
      }
    });
  }
};

export default rule;
