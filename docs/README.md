# Introduction

An eslint plugin for checking accessibility rules from within .vue files.

## Installation

<br>

```bash
$ npm install -D eslint-plugin-vuejs-accessibility
# or
$ yarn add -D eslint-plugin-vuejs-accessibility
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
