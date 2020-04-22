const rule = require("../no-access-key");
const makeRuleTester = require("./makeRuleTester");

makeRuleTester("no-access-key", rule, {
  valid: ["<div />", "<div accesskey />"],
  invalid: ["<div accesskey='h' />", "<div :accesskey='h' />"]
});
