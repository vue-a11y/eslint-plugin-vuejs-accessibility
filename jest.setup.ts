import { RuleTester } from "eslint";

interface JestRuleTester extends RuleTester {
  describe: (text: string, callback: () => void) => void;
  it: { title?: string } & ((text: string, callback: () => void) => void);
}

const ruleTester = RuleTester as unknown as JestRuleTester;

ruleTester.describe = (text: string, callback: () => void) => {
  ruleTester.it.title = text;
  return callback.call(this);
};

ruleTester.it = (text: string, callback: () => void) => {
  test(`${ruleTester.it.title}: ${text}`, callback);
};
