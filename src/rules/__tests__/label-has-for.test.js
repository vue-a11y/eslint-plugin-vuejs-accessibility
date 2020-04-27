const rule = require("../label-has-for");
const makeRuleTester = require("./makeRuleTester");

makeRuleTester("label-has-for", rule, {
  valid: [
    "<label for='id'><input type='text' /></label>",
    "<label :for='id'><input type='text' :id='id' /></label>",
    {
      code: "<label for='id' /><input type='text' />",
      options: [{ required: { some: ["nesting", "id"] } }]
    },
    {
      code: "<label>name</label>",
      options: [{ required: { some: ["nesting", "id"] }, allowChildren: true }]
    }
  ],
  invalid: [
    "<label for='id' />",
    "<label><input type='text' /></label>",
    {
      code: "<Label for='id' />",
      options: [{ components: ["Label"] }],
      errors: [{ messageId: "default" }]
    }
  ]
});
