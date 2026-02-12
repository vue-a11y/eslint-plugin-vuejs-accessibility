import { default as recommended } from "./configs/recommended";
import flatRecommended from "./configs/flat/recommended";

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
import noAriaHiddenOnFocusable from "./rules/no-aria-hidden-on-focusable";
import noAutofocus from "./rules/no-autofocus";
import noDistractingElements from "./rules/no-distracting-elements";
import noOnchange from "./rules/no-onchange";
import noRedundantRoles from "./rules/no-redundant-roles";
import noRolePresentationOnFocusable from "./rules/no-role-presentation-on-focusable";
import noStaticElementInteractions from "./rules/no-static-element-interactions";
import roleHasRequiredAriaProps from "./rules/role-has-required-aria-props";
import tabindexNoPositive from "./rules/tabindex-no-positive";

import type { AST } from "vue-eslint-parser";

declare module "estree" {
  export interface NodeMap {
    VElement: AST.VElement;
    VAttribute: AST.VAttribute;
  }
}

const configs = {
  recommended,
  "flat/recommended": flatRecommended
};
const rules = {
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
  "no-aria-hidden-on-focusable": noAriaHiddenOnFocusable,
  "no-autofocus": noAutofocus,
  "no-distracting-elements": noDistractingElements,
  "no-onchange": noOnchange,
  "no-redundant-roles": noRedundantRoles,
  "no-role-presentation-on-focusable": noRolePresentationOnFocusable,
  "no-static-element-interactions": noStaticElementInteractions,
  "role-has-required-aria-props": roleHasRequiredAriaProps,
  "tabindex-no-positive": tabindexNoPositive
};

export = {
  configs,
  rules
};
