import assert from "assert";
import { Linter } from "eslint";
import plugin from "../../index";
import { usingFlatConfig } from "../../rules/__tests__/makeRuleTester";

function runLinter(key: string, rule: any, filename: string) {
  const code = "var a;";
  const ruleId = `vuejs-accessibility/${key}`;
  const linter = new Linter();

  if (usingFlatConfig) {
    return linter.verify(
      code,
      [
        {
          files: ["*.vue"],
          plugins: { "vuejs-accessibility": { rules: { [key]: rule } } },
          rules: { [ruleId]: "error" }
        }
      ],
      filename
    );
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore this does not exist in ESLint v10, but we don't get here if we're on ESLint v9+
  linter.defineRule(ruleId, rule);
  const config: Linter.Config = {
    rules: { [ruleId]: "error" }
  };

  return linter.verifyAndFix(code, config, filename).messages;
}

describe("Don't crash even if without vue-eslint-parser.", () => {
  for (const [key, rule] of Object.entries(plugin.rules)) {
    const ruleId = `vuejs-accessibility/${key}`;

    it(ruleId, () => {
      const resultVue = runLinter(key, rule, "test.vue");
      for (const { message } of resultVue) {
        assert.strictEqual(
          message,
          "Use the latest vue-eslint-parser. See also https://eslint.vuejs.org/user-guide/#what-is-the-use-the-latest-vue-eslint-parser-error."
        );
      }

      const resultJs = runLinter(key, rule, "test.js");
      assert.strictEqual(resultJs.length, 0);
    });
  }
});
