import { defineLoader } from "vitepress";
import { rules as baseRules } from "../../src/configs/rules.js";
import { rules } from "../.vitepress/rulesForSidebar.js";

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
  if (baseRules) {
    return Object.keys(baseRules).map(removeRulePrefix);
  }
  return [];
}

function removeRulePrefix(ruleName: string) {
  return ruleName.replace("vuejs-accessibility/", "");
}
