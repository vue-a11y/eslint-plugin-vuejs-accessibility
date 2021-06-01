# eslint-plugin-vuejs-accessibility

[![Build Status](https://github.com/vue-a11y/eslint-plugin-vuejs-accessibility/workflows/Main/badge.svg)](https://github.com/vue-a11y/eslint-plugin-vuejs-accessibility/actions)
[![Package Version](https://img.shields.io/npm/v/eslint-plugin-vuejs-accessibility.svg)](https://www.npmjs.com/package/eslint-plugin-vuejs-accessibility)

An `eslint` plugin for checking accessibility rules from within `.vue` files.

## Installation

If you're using `yarn`:

```bash
yarn add --dev eslint-plugin-vuejs-accessibility
```

or if you're using `npm`:

```bash
npm install --save-dev eslint-plugin-vuejs-accessibility
```

## Usage

Add `vuejs-accessibility` to the plugins section of your `eslint` configuration. You can omit the `eslint-plugin-` prefix:

```json
{
  "plugins": ["vuejs-accessibility"]
}
```

Then configure the rules you want to use under the rules section.

```json
{
  "rules": {
    "vuejs-accessibility/rule-name": "error"
  }
}
```

You can also enable all the recommended rules at once. Add `plugin:vuejs-accessibility/recommended` in extends:

```json
{
  "extends": ["plugin:vuejs-accessibility/recommended"]
}
```

## Development

Ensure you have `node` and `yarn` installed on your system. Then run `yarn` in the root of the repository to install the dependencies.

### Adding a new rule

To add a new rule, you need to take the following steps:

- Add the configuration and require to `src/index.ts`.
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
