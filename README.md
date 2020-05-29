# eslint-plugin-vuejs-accessibility

[![Build Status](https://github.com/vue-a11y/eslint-plugin-vuejs-accessibility/workflows/Main/badge.svg)](https://github.com/vue-a11y/eslint-plugin-vuejs-accessibility/actions)
[![Package Version](https://img.shields.io/npm/v/eslint-plugin-vuejs-accessibility.svg)](https://www.npmjs.com/package/eslint-plugin-vuejs-accessibility)

An `eslint` plugin for checking accessibility rules from within `.vue` files.

## Links

- [Documentation](https://multiselect.vue-a11y.com)

## Development

Ensure you have `node` and `yarn` installed on your system. Then run `yarn` in the root of the repository to install the dependencies.

### Adding a new rule

To add a new rule, you need to take the following steps:

- Add the configuration and require to `src/index.js`.
- Add the rule itself into `src/rules`.
- Add the corresponding test in `src/rules/__tests__`.
- Add the corresponding documentation in `docs/rules`.

## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/vue-a11y/eslint-plugin-vuejs-accessibility.

## License

The code is available as open source under the terms of the [MIT License](https://opensource.org/licenses/MIT).

## Credit

The work for this plugin was largely based on previous work done on [eslint-plugin-vue-a11y](https://github.com/maranran/eslint-plugin-vue-a11y), as well as various other tools, including:

- [eslint-plugin-jsx-a11y](https://github.com/evcohen/eslint-plugin-jsx-a11y)
- [eslint-plugin-vue](https://github.com/vuejs/eslint-plugin-vue)
- [jsx-ast-utils](https://github.com/vuejs/eslint-plugin-vue)
