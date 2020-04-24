# eslint-plugin-vue-accessibility

[![Build Status](https://github.com/kddeisz/eslint-plugin-vue-accessibility/workflows/Main/badge.svg)](https://github.com/kddeisz/eslint-plugin-vue-accessibility/actions)

An `eslint` plugin for checking accessibility rules from within `.vue` files.

## Usage

Add `vue-accessibility` to the plugins section of your `eslint` configuration. You can omit the `eslint-plugin-` prefix:

```json
{
  "plugins": ["vue-accessibility"]
}
```

Then configure the rules you want to use under the rules section.

```json
{
  "rules": {
    "vue-accessibility/rule-name": "error"
  }
}
```

You can also enable all the recommended rules at once. Add `plugin:vue-accessibility/recommended` in extends:

```json
{
  "extends": ["plugin:vue-accessibility/recommended"]
}
```

## Development

Ensure you have `node` and `yarn` installed on your system. Then run `yarn` in the root of the repository to install the dependencies.

### Adding a new rule

To add a new rule, you need to take the following steps:

- Add the configuration and require to `src/index.js`.
- Add the rule itself into `src/rules`.
- Add the corresponding test in `src/rules/__tests__`.
- Add the corresponding documentation in `docs/rules`.

### Status

I'm currently working on getting parity between this project and `eslint-plugin-vue-a11y`. These are the rules I currently plan to support:

- [ ] accessible-emoji
- [ ] alt-text
- [x] anchor-has-content
- [x] aria-props
- [x] aria-role
- [ ] aria-unsupported-elements
- [ ] click-events-have-key-events
- [ ] form-has-label
- [x] heading-has-content
- [x] iframe-has-title
- [ ] interactive-supports-focus
- [ ] label-has-for
- [ ] media-has-caption
- [ ] mouse-events-have-key-events
- [x] no-access-key
- [x] no-autofocus
- [x] no-distracting-elements
- [x] no-onchange
- [x] no-redundant-roles
- [x] role-has-required-aria-props
- [x] tabindex-no-positive

## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/kddeisz/eslint-plugin-vue-accessibility.

## License

The code is available as open source under the terms of the [MIT License](https://opensource.org/licenses/MIT).
