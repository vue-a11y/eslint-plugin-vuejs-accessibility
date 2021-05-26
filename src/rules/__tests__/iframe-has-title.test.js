const rule = require("../iframe-has-title");
const makeRuleTester = require("./makeRuleTester");

makeRuleTester("iframe-has-title", rule, {
  valid: ["<iframe title='test' />", "<iframe :title='test' />"],
  invalid: ["<iframe />", "<iframe :title='true' />", "<iframe :title='2' />"]
});
