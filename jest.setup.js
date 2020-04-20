const { RuleTester } = require("eslint");

RuleTester.describe = (text, callback) => {
  RuleTester.it.title = text;
  return callback.call(this);
};

RuleTester.it = (text, callback) => {
  test(`${RuleTester.it.title}: ${text}`, callback);
};
