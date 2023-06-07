import { defineLoader } from "vitepress";
import recommended from "../../src/configs/recommended";
import { rules } from "../.vitepress/rulesForSidebar";

export type Data = Array<{
  name: string;
  link: string;
  recommended: boolean;
}>;

declare const data: Data;
export { data };

export default defineLoader({
  load(): Data {
    const recommended = getRecommendedRules();
    return rules.map((rule) => ({
      name: rule.text,
      link: rule.link,
      recommended: recommended.includes(rule.text)
    }));
  }
});

function getRecommendedRules() {
  if (recommended.rules) {
    return Object.keys(recommended.rules).map(removeRulePrefix);
  }
  return [];
}

function removeRulePrefix(ruleName: string) {
  return ruleName.replace("vuejs-accessibility/", "");
}
