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
    "vue-accessibility/rule-name": 2
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

## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/kddeisz/eslint-plugin-vue-accessibility.

## License

The code is available as open source under the terms of the [MIT License](https://opensource.org/licenses/MIT).
