import cp from "child_process";
import path from "path";
import semver from "semver";
import { readPackageJson } from "./helper";

const ESLINT = `.${path.sep}node_modules${path.sep}.bin${path.sep}eslint`;

describe("Integration with flat config", () => {
  let originalCwd: null | string = null;
  const dirFixture = path.join(__dirname, "__fixtures__/flat-config");

  beforeEach(() => {
    originalCwd = process.cwd();
    process.chdir(dirFixture);
    cp.execSync("npm i -f", { stdio: "inherit" });
  });
  afterEach(() => {
    originalCwd && process.chdir(originalCwd);
  });

  it("should work with config", () => {
    if (
      !semver.satisfies(
        process.version,
        readPackageJson(
          path.resolve(dirFixture, "node_modules/eslint")
        ).engines.node
      )
    ) {
      return;
    }

    const result = JSON.parse(
      cp.execSync(`${ESLINT} a.vue --max-warnings 1 --format=json`, {
        encoding: "utf-8"
      })
    );
    expect(result.length).toBe(1);
    expect(result[0].messages[0].messageId).toBe("imgMissingAlt");
  });
});
