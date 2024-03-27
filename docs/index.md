# Getting Started

An `eslint` plugin for checking accessibility rules from within `.vue` files.

## 💿 Installation

::: code-group

```bash [yarn]
yarn add --dev eslint-plugin-vuejs-accessibility
```

```bash [npm]
npm install --save-dev eslint-plugin-vuejs-accessibility
```

```bash [pnpm]
pnpm add -D eslint-plugin-vuejs-accessibility
```

:::

## 📖 Usage

### Configuration (`eslint.config.js`)

Use `eslint.config.js` file to configure rules. This is the default in ESLint v9, but can be used starting from ESLint v8.57.0. See also: https://eslint.org/docs/latest/use/configure/configuration-files-new.

Example eslint.config.js:

```js
import pluginVueA11y from "eslint-plugin-vuejs-accessibility";

export default [
  // add more generic rulesets here, such as:
  // js.configs.recommended,
  ...pluginVueA11y.configs["flat/recommended"],
  {
    rules: {
      // override/add rules settings here, such as:
      // "vuejs-accessibility/alt-text": "error"
    }
  }
];
```

### Configuration (`.eslintrc`)

Use `.eslintrc.*` file to configure rules in ESLint < v9. See also: https://eslint.org/docs/latest/use/configure/.

Add `vuejs-accessibility` to the plugins section of your configuration. You can omit the `eslint-plugin-` prefix:

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
