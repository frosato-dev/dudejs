import fs from "fs";
import { execSync } from "child_process";
import { CLIENT_DIR } from "./constants";

const FILE_PATH = `${CLIENT_DIR}/src/toLint.js`;

beforeAll(() => {
  fs.writeFileSync(FILE_PATH, `const unused = 1`);
});

it("should pass", () => {
  let stdout;
  try {
    execSync("npx dukejs lint", { cwd: CLIENT_DIR });
  } catch (err) {
    stdout = err.stdout.toString();
  }
  expect(stdout).toBeDefined();
  expect(stdout).toMatch(/error  'unused' is assigned a value but never used/);
});
