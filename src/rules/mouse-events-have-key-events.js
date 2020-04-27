const {
  defineTemplateBodyVisitor,
  hasOnDirectives,
  makeDocsURL
} = require("../utils");

module.exports = {
  meta: {
    docs: {
      url: makeDocsURL("mouse-events-have-key-events")
    },
    messages: {
      mouseOver:
        "@mouseover, @mouseenter, or @hover must be accompanied by @focusin or @focus for accessibility.",
      mouseOut:
        "@mouseout or @mouseleave must be accompanied by @focusout or @blur for accessibility."
    }
  },
  create(context) {
    return defineTemplateBodyVisitor(context, {
      VElement(node) {
        if (
          hasOnDirectives(node, ["mouseover", "mouseenter", "hover"]) &&
          !hasOnDirectives(node, ["focus", "focusin"])
        ) {
          context.report({ node, messageId: "mouseOver" });
        }

        if (
          hasOnDirectives(node, ["mouseout", "mouseleave"]) &&
          !hasOnDirectives(node, ["blur", "focusout"])
        ) {
          context.report({ node, messageId: "mouseOut" });
        }
      }
    });
  }
};
