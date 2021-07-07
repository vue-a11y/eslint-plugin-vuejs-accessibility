import assert from "assert";
import { Linter } from "eslint";
import plugin from "../../index";

describe("Don't crash even if without vue-eslint-parser.", () => {
  const code = "var a;";

  for (const [key, rule] of Object.entries(plugin.rules)) {
    const ruleId = `vuejs-accessibility/${key}`;

    it(ruleId, () => {
      const linter = new Linter();
      linter.defineRule(ruleId, rule);
      const config: Linter.Config = {
        parser: "espree",
        rules: {
          [ruleId]: "error"
        }
      };
      const resultVue = linter.verifyAndFix(code, config, "test.vue");
      for (const { message } of resultVue.messages) {
        assert.strictEqual(
          message,
          "Use the latest vue-eslint-parser. See also https://eslint.vuejs.org/user-guide/#what-is-the-use-the-latest-vue-eslint-parser-error."
        );
      }

      const resultJs = linter.verifyAndFix(code, config, "test.js");
      assert.strictEqual(resultJs.messages.length, 0);
    });
  }
});
