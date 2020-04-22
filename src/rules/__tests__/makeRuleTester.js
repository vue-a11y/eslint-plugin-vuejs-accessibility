const { RuleTester } = require("eslint");

module.exports = (name, rule, config) => {
  const ruleTester = new RuleTester({
    parser: require.resolve("vue-eslint-parser"),
    parserOptions: {
      ecmaVersion: 2015,
      sourceType: "module",
      ecmaFeatures: {
        jsx: true
      }
    }
  });

  ruleTester.run(name, rule, config);
};
