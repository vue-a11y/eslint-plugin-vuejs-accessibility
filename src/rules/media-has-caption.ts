import type { Rule } from "eslint";
import type { AST } from "vue-eslint-parser";

import {
  defineTemplateBodyVisitor,
  getAttributeValue,
  getElementAttribute,
  getElementAttributeValue,
  getElementType,
  makeDocsURL,
  makeKebabCase
} from "../utils";

function isCaptionsTrackElement(
  node: AST.VElement | AST.VExpressionContainer | AST.VText
) {
  const kind =
    node.type === "VElement" && getElementAttributeValue(node, "kind");

  return kind && typeof kind === "string" && kind.toLowerCase() === "captions";
}

const rule: Rule.RuleModule = {
  meta: {
    type: "problem",
    docs: {
      url: makeDocsURL("media-has-caption")
    },
    messages: {
      default:
        "Media elements such as <audio> and <video> must have a <track> for captions."
    },
    schema: [
      {
        type: "object",
        properties: {
          audio: {
            type: "array",
            items: { type: "string" }
          },
          track: {
            type: "array",
            items: { type: "string" }
          },
          video: {
            type: "array",
            items: { type: "string" }
          }
        }
      }
    ]
  },
  create(context) {
    return defineTemplateBodyVisitor(context, {
      VElement(node) {
        const { audio = [], track = [], video = [] } = context.options[0] || {};

        const mediaElementTypes = audio
          .concat(video)
          .map(makeKebabCase)
          .concat("audio", "video");
        if (!mediaElementTypes.includes(getElementType(node))) {
          return;
        }

        const muted = getElementAttribute(node, "muted");
        if (muted && (getAttributeValue(muted) || "").toString() !== "false") {
          return;
        }

        const trackElementTypes = track.map(makeKebabCase).concat("track");
        const trackElements = node.children.filter(
          (child) =>
            child.type === "VElement" &&
            trackElementTypes.includes(getElementType(child))
        );

        if (
          trackElements.length === 0 ||
          !trackElements.some(isCaptionsTrackElement)
        ) {
          context.report({ node: node as any, messageId: "default" });
        }
      }
    });
  }
};

export default rule;
