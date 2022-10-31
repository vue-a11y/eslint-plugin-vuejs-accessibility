# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/) and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [2.0.0] - 2022-10-30

### Added

- `labelComponents` options to add custom label components in `form-control-has-label`.
- `controlComponents` options to add custom control components in `form-control-has-label`.

### Changed

- Require `aria-query` version 5.0.0 or higher. This is a breaking change for this dependency, meaning it's a breaking change for this package.

## [1.1.1] - 2021-12-23

### Changed

- Deprecate the accessible-emoji rule. See https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/issues/627 for details.
- Fix the `alt-text` handling of different element case names.
- Fix the `anchor-has-content` handling for content directives (v-html, v-text) on child elements.

## [1.1.0] - 2021-10-14

### Added

- Change the peer dependency to allow ESLint 8 without a warning.

## [1.0.0] - 2021-10-14

### Changed

- Major bump because of the `aria-query` dependency major bump.

## [0.7.1] - 2021-07-15

### Changed

- Reduce overall bundle size by ignoring a lot more files in `.npmignore`.

## [0.7.0] - 2021-07-15

### Added

- The `accessibleDirectives` option to both `heading-has-content` and `anchor-has-content`.

### Changed

- Ensure directives that have identifiers for values are counted as present in the element.
- Convert over to using TypeScript for development.

## [0.6.2] - 2021-05-26

### Changed

- Fix `iframe-has-title` such that if the attribute is ommitted completely that it fires correctly.
- Fix `form-control-has-label` to ignore form controls nested inside `aria-hidden` elements.

## [0.6.1] - 2021-01-21

### Changed

- Fix up the extra quote at the end of the doc links.

## [0.6.0] - 2020-10-29

### Added

- For the `heading-has-content` and the `anchor-has-content` rules, add an `accessibleChildren` option that always marks certain children as being accessible.

### Changed

- Handle non string literal role values and `role-has-required-aria-props` and non string literal value for `kind` attribute in `media-has-caption`.

## [0.5.1] - 2020-09-08

### Changed

- When you pass a conditional expression into an `:is`, then `getElementType` would not be able to handle it. It doesn't truly handle it now, as it just ends up returning `null` for the value of the `:is` expression, but at least now it doesn't break.

## [0.5.0] - 2020-09-05

### Changed

- Ensure all rules that allow configuring extra components that should match certain conditions support both forms of casing (`VFoo` and `v-foo`).
- For the `anchor-has-content` rule, we're now going to allow images with an `alt` tag as the screen reader should pick that up as the content.

## [0.4.0] - 2020-08-15

### Added

- The `controlComponents` option for the `label-has-for` rule, which allows you to configure the rule to allow additional control components.

## [0.3.1] - 2020-07-10

### Changed

- When emojis are hidden from the a11y tree, don't warn with the `accessible-emoji` rule.

## [0.3.0] - 2020-07-03

### Changed

- For the `anchor-has-content` rule, allow anchors with explicit aria labels to pass.
- For the `label-has-for` rule when validating that there is correct nesting, ensure that we're actually checking for form controls and not just checking for VElement nodes.

## [0.2.0] - 2020-06-26

### Changed

- Bump the dependency on `aria-query` to `4.2.2`.

## [0.1.3] - 2020-05-27

### Changed

- Support deeply nested `input` controls for the `form-control-has-label` rule.

## [0.1.2] - 2020-05-11

### Changed

- Support using `v-bind` to pass an object, as in `v-bind:$attrs`.
- The `hasContent` check should be assume slots will have content.

## [0.1.1] - 2020-04-27

### Changed

- Fix checking for directives when they don't have any arguments.
- Fix `aria-props` rule when checking custom directives.

## [0.1.0] - 2020-04-27

### Added

- Initial release 🎉.

[unreleased]: https://github.com/vue-a11y/eslint-plugin-vuejs-accessibility/compare/v2.0.0...HEAD
[2.0.0]: https://github.com/vue-a11y/eslint-plugin-vuejs-accessibility/compare/v1.1.1...v2.0.0
[1.1.1]: https://github.com/vue-a11y/eslint-plugin-vuejs-accessibility/compare/v1.1.0...v1.1.1
[1.1.0]: https://github.com/vue-a11y/eslint-plugin-vuejs-accessibility/compare/v1.0.0...v1.1.0
[1.0.0]: https://github.com/vue-a11y/eslint-plugin-vuejs-accessibility/compare/v0.7.1...v1.0.0
[0.7.1]: https://github.com/vue-a11y/eslint-plugin-vuejs-accessibility/compare/v0.7.0...v0.7.1
[0.7.0]: https://github.com/vue-a11y/eslint-plugin-vuejs-accessibility/compare/v0.6.2...v0.7.0
[0.6.2]: https://github.com/vue-a11y/eslint-plugin-vuejs-accessibility/compare/v0.6.1...v0.6.2
[0.6.1]: https://github.com/vue-a11y/eslint-plugin-vuejs-accessibility/compare/v0.6.0...v0.6.1
[0.6.0]: https://github.com/vue-a11y/eslint-plugin-vuejs-accessibility/compare/v0.5.1...v0.6.0
[0.5.1]: https://github.com/vue-a11y/eslint-plugin-vuejs-accessibility/compare/v0.5.0...v0.5.1
[0.5.0]: https://github.com/vue-a11y/eslint-plugin-vuejs-accessibility/compare/v0.4.0...v0.5.0
[0.4.0]: https://github.com/vue-a11y/eslint-plugin-vuejs-accessibility/compare/v0.3.1...v0.4.0
[0.3.1]: https://github.com/vue-a11y/eslint-plugin-vuejs-accessibility/compare/v0.3.0...v0.3.1
[0.3.0]: https://github.com/vue-a11y/eslint-plugin-vuejs-accessibility/compare/v0.2.0...v0.3.0
[0.2.0]: https://github.com/vue-a11y/eslint-plugin-vuejs-accessibility/compare/v0.1.3...v0.2.0
[0.1.3]: https://github.com/vue-a11y/eslint-plugin-vuejs-accessibility/compare/v0.1.2...v0.1.3
[0.1.2]: https://github.com/vue-a11y/eslint-plugin-vuejs-accessibility/compare/v0.1.1...v0.1.2
[0.1.1]: https://github.com/vue-a11y/eslint-plugin-vuejs-accessibility/compare/v0.1.0...v0.1.1
[0.1.0]: https://github.com/vue-a11y/eslint-plugin-vuejs-accessibility/compare/9de449...v0.1.0
