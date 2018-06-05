import path from "path";
import { exec, fileExists, read, write, cleanSrcDirectory, unifyTmpDir } from "./utils";
import { CLIENT_DIR } from "./constants";

const HOOK_PATH = path.join(CLIENT_DIR, ".git", "hooks", "pre-commit");

beforeAll(() => {
  cleanSrcDirectory();
});

it("should have a pre-commit file", () => {
  expect(fileExists(HOOK_PATH)).toBe(true);
  expect(read(HOOK_PATH)).toMatchSnapshot();
});

it("should process staged files on pre-commit", () => {
  write(`${CLIENT_DIR}/src/on-stage.js`, `const hello = "Hello";`);
  write(`${CLIENT_DIR}/src/out-stage.js`, `const hello = "Hello";`);

  exec("git add ./src/on-stage.js");
  let stdout;
  try {
    exec('git commit -m "test"');
  } catch (err) {
    stdout = err.stderr.toString();
  }

  expect(stdout).toBeDefined();
  expect(unifyTmpDir(stdout.replace(/[0-9]+ms/g, "XXms"))).toMatchSnapshot(
    "pre-commit error output",
  );
  expect(read(`${CLIENT_DIR}/src/on-stage.js`)).toMatchSnapshot("formatted js file");
});
