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
