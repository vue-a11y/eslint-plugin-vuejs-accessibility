const rule = require("../label-has-for");
const makeRuleTester = require("./makeRuleTester");

makeRuleTester("label-has-for", rule, {
  valid: [
    "<label for='id'><input type='text' /></label>",
    "<label :for='id'><input type='text' :id='id' /></label>",
    "<label for='id'><span><input type='text' /></span></label>",
    {
      code: "<label for='id' /><input type='text' />",
      options: [{ required: { some: ["nesting", "id"] } }]
    },
    {
      code: "<label for='id'><slot /></label>",
      options: [{ allowChildren: true }]
    },
    {
      code: "<label for='id'><span><VInput /><span></label>",
      options: [{ controlComponents: ["VInput"] }]
    },
    {
      code: "<label for='id'><v-input /></label>",
      options: [{ controlComponents: ["VInput"] }]
    }
  ],
  invalid: [
    "<label for='id' />",
    "<label><input type='text' /></label>",
    "<label for='id'><slot /></label>",
    "<label for='id'><div /></label>",
    "<label for='id'><VInput /></label>",
    "<label for='id'><div><VInput /></div></label>",
    {
      code: "<v-label for='id' />",
      options: [{ components: ["VLabel"] }],
      errors: [{ messageId: "default" }]
    }
  ]
});
