import path from "path";
import { exec, fileExists, read, write, cleanSrcDirectory, unifyTmpDir } from "./utils";
import { CLIENT_DIR } from "./constants";

const HOOK_PATH = path.join(CLIENT_DIR, ".git", "hooks", "commit-msg");

beforeAll(() => {
  cleanSrcDirectory();
});

it("should have a commit-msg file", () => {
  expect(fileExists(HOOK_PATH)).toBe(true);
  expect(read(HOOK_PATH)).toMatchSnapshot();
});

it("should pass with valid commit message", () => {
  write(`${CLIENT_DIR}/src/commit-lint.js`, `/*eslint-disable*/ console.log('hello commit-msg');`);

  exec("git add ./src/commit-lint.js");
  const stdout = exec('git commit -m "test: ci"');
  const value = stdout.toString();
  const toSnapshot = value.replace(/\[master \(root-commit\) [a-z0-9]{7}\]/, "<COMMIT_INFO>");
  expect(toSnapshot).toMatchSnapshot("commit-lint success");
});

it("should fail with wrong commit message", () => {
  write(`${CLIENT_DIR}/src/commit-lint.js`, `/*eslint-disable*/ console.log('hello commit-msg2');`);

  exec("git add ./src/commit-lint.js");
  let stdout;
  try {
    exec('git commit -m "foo: ci"');
  } catch (err) {
    stdout = err.stderr.toString();
  }

  expect(unifyTmpDir(stdout.replace(/[0-9]+ms/g, "XXms"))).toMatchSnapshot(
    "commit-lint error output",
  );
});
