import accessibleEmoji from "./rules/accessible-emoji";
import altText from "./rules/alt-text";
import anchorHasContent from "./rules/anchor-has-content";
import ariaProps from "./rules/aria-props";
import ariaRole from "./rules/aria-role";
import ariaUnsupportedElements from "./rules/aria-unsupported-elements";
import clickEventsHaveKeyEvents from "./rules/click-events-have-key-events";
import formControlHasLabel from "./rules/form-control-has-label";
import headingHasContent from "./rules/heading-has-content";
import iframeHasTitle from "./rules/iframe-has-title";
import interactiveSupportsFocus from "./rules/interactive-supports-focus";
import labelHasFor from "./rules/label-has-for";
import mediaHasCaption from "./rules/media-has-caption";
import mouseEventsHaveKeyEvents from "./rules/mouse-events-have-key-events";
import noAccessKey from "./rules/no-access-key";
import noAutofocus from "./rules/no-autofocus";
import noDistractingElements from "./rules/no-distracting-elements";
import noOnchange from "./rules/no-onchange";
import noRedundantRoles from "./rules/no-redundant-roles";
import roleHasRequiredAriaProps from "./rules/role-has-required-aria-props";
import tabindexNoPositive from "./rules/tabindex-no-positive";

export default {
  rules: {
    "accessible-emoji": accessibleEmoji,
    "alt-text": altText,
    "anchor-has-content": anchorHasContent,
    "aria-props": ariaProps,
    "aria-role": ariaRole,
    "aria-unsupported-elements": ariaUnsupportedElements,
    "click-events-have-key-events": clickEventsHaveKeyEvents,
    "form-control-has-label": formControlHasLabel,
    "heading-has-content": headingHasContent,
    "iframe-has-title": iframeHasTitle,
    "interactive-supports-focus": interactiveSupportsFocus,
    "label-has-for": labelHasFor,
    "media-has-caption": mediaHasCaption,
    "mouse-events-have-key-events": mouseEventsHaveKeyEvents,
    "no-access-key": noAccessKey,
    "no-autofocus": noAutofocus,
    "no-distracting-elements": noDistractingElements,
    "no-onchange": noOnchange,
    "no-redundant-roles": noRedundantRoles,
    "role-has-required-aria-props": roleHasRequiredAriaProps,
    "tabindex-no-positive": tabindexNoPositive
  },
  configs: {
    recommended: {
      parser: require.resolve("vue-eslint-parser"),
      parserOptions: {
        ecmaVersion: 2020 as const,
        sourceType: "module" as const
      },
      env: {
        browser: true,
        es6: true
      },
      plugins: ["vuejs-accessibility"],
      rules: {
        "vuejs-accessibility/accessible-emoji": "error" as const,
        "vuejs-accessibility/alt-text": "error" as const,
        "vuejs-accessibility/anchor-has-content": "error" as const,
        "vuejs-accessibility/aria-props": "error" as const,
        "vuejs-accessibility/aria-role": "error" as const,
        "vuejs-accessibility/aria-unsupported-elements": "error" as const,
        "vuejs-accessibility/click-events-have-key-events": "error" as const,
        "vuejs-accessibility/form-control-has-label": "error" as const,
        "vuejs-accessibility/heading-has-content": "error" as const,
        "vuejs-accessibility/iframe-has-title": "error" as const,
        "vuejs-accessibility/interactive-supports-focus": "error" as const,
        "vuejs-accessibility/label-has-for": "error" as const,
        "vuejs-accessibility/media-has-caption": "error" as const,
        "vuejs-accessibility/mouse-events-have-key-events": "error" as const,
        "vuejs-accessibility/no-access-key": "error" as const,
        "vuejs-accessibility/no-autofocus": "error" as const,
        "vuejs-accessibility/no-distracting-elements": "error" as const,
        "vuejs-accessibility/no-onchange": "error" as const,
        "vuejs-accessibility/no-redundant-roles": "error" as const,
        "vuejs-accessibility/role-has-required-aria-props": "error" as const,
        "vuejs-accessibility/tabindex-no-positive": "error" as const
      }
    }
  }
};
