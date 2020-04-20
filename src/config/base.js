module.exports = {
  root: true,
  parser: require.resolve("vue-eslint-parser"),
  parserOptions: {
    ecmaVersion: 2015,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
      experimentalObjectRestSpread: true
    }
  },
  plugins: [
    "vue-accessibility"
  ],
  env: {
    browser: true,
    es6: true
  },
  rules: {
    "vue-accessibility/tabindex-no-positive": "error"
  }
};
