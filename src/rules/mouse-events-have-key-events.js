const {
  defineTemplateBodyVisitor,
  hasOnDirectives,
  makeDocsURL
} = require("../utils");

const mouseOverErrorMessage = `@mouseover, @mouseenter, or @hover must be \
accompanied by @focusin or @focus for accessibility.`;

const mouseOutErrorMessage = `@mouseout or @mouseleave must be accompanied by \
@focusout or @blur for accessibility.`;

module.exports = {
  meta: {
    docs: {
      url: makeDocsURL("mouse-events-have-key-events")
    }
  },
  create(context) {
    return defineTemplateBodyVisitor(context, {
      VElement(node) {
        if (
          hasOnDirectives(node, ["mouseover", "mouseenter", "hover"]) &&
          !hasOnDirectives(node, ["focus", "focusin"])
        ) {
          context.report({ node, message: mouseOverErrorMessage });
        }

        if (
          hasOnDirectives(node, ["mouseout", "mouseleave"]) &&
          !hasOnDirectives(node, ["blur", "focusout"])
        ) {
          context.report({ node, message: mouseOutErrorMessage });
        }
      }
    });
  },
  mouseOverErrorMessage,
  mouseOutErrorMessage
};
