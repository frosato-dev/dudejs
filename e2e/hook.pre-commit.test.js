import fs from "fs";
import path from 'path';
import { CLIENT_DIR } from "./constants";

const HOOK_PATH = path.join(CLIENT_DIR, '.git', 'hooks', 'pre-commit')

it("should have a pre-commit file", () => {
  const exits = fs.existsSync(HOOK_PATH)
  expect(exits).toBe(true);
});

it("should match snapshot", () => {
    const output = fs.readFileSync(HOOK_PATH, "utf8");
    expect(output).toMatchSnapshot()
});
