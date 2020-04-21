const { RuleTester } = require("eslint");

module.exports = (name, rule, config) => {
  const ruleTester = new RuleTester({
    parser: require.resolve("vue-eslint-parser"),
    parserOptions: {
      ecmaFeatures: {
        jsx: true
      }
    }
  });

  ruleTester.run(name, rule, config);
};
