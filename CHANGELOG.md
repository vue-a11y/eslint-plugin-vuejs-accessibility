# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/) and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased]

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

[unreleased]: https://github.com/vue-a11y/eslint-plugin-vuejs-accessibility/compare/v0.4.0...HEAD
[0.4.0]: https://github.com/vue-a11y/eslint-plugin-vuejs-accessibility/compare/v0.3.1...v0.4.0
[0.3.1]: https://github.com/vue-a11y/eslint-plugin-vuejs-accessibility/compare/v0.3.0...v0.3.1
[0.3.0]: https://github.com/vue-a11y/eslint-plugin-vuejs-accessibility/compare/v0.2.0...v0.3.0
[0.2.0]: https://github.com/vue-a11y/eslint-plugin-vuejs-accessibility/compare/v0.1.3...v0.2.0
[0.1.3]: https://github.com/vue-a11y/eslint-plugin-vuejs-accessibility/compare/v0.1.2...v0.1.3
[0.1.2]: https://github.com/vue-a11y/eslint-plugin-vuejs-accessibility/compare/v0.1.1...v0.1.2
[0.1.1]: https://github.com/vue-a11y/eslint-plugin-vuejs-accessibility/compare/v0.1.0...v0.1.1
[0.1.0]: https://github.com/vue-a11y/eslint-plugin-vuejs-accessibility/compare/9de449...v0.1.0
