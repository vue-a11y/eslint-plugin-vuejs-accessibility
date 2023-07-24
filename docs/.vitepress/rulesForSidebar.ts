import { join, parse } from "node:path";
import { Dirent, readdirSync } from "node:fs";
import { BASE_URL } from "./constants";

export const rules = getRulesForSideBar();

function getRulesForSideBar() {
  const rulesDirectory = join(__dirname, "../", "rules");
  return readdirSync(rulesDirectory, { withFileTypes: true })
    .filter(isFile)
    .filter(isMarkdown)
    .map(fileNameWithoutExtension)
    .map(ruleToSidebarItem);
}

function isFile(dirent: Dirent) {
  return !dirent.isDirectory();
}

function isMarkdown(dirent: Dirent) {
  return dirent.name.endsWith(".md");
}

function fileNameWithoutExtension(file: Dirent) {
  const parsedFileName = parse(file.name);
  const nameWithoutExtension = parsedFileName.name;
  return nameWithoutExtension;
}

function ruleToSidebarItem(ruleName: string) {
  return {
    text: ruleName,
    link: `${BASE_URL}rules/${ruleName}`
  };
}
