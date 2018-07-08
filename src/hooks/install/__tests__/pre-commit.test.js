/* eslint no-console: 0 */

console.log = jest.fn();
process.exit = jest.fn();

const mockWriteFileSync = jest.fn();
const mockExistsSync = jest.fn(() => true);
const mockReadPkgUp = jest.fn(() => ({ pkg: { name: "some project" } }));

jest.mock("read-pkg-up", () => ({
  sync: mockReadPkgUp,
}));

jest.mock("fs", () => ({
  existsSync: mockExistsSync,
  writeFileSync: mockWriteFileSync,
}));

beforeEach(() => {
  jest.resetAllMocks();
  jest.resetModules();
});

it("should do nothing if no package.json found", () => {
  mockReadPkgUp.mockReturnValue({ pkg: null });

  const precommit = require("../pre-commit").default;
  precommit("/projectPath");

  expect(console.log).toHaveBeenCalledWith(expect.stringMatching("❌"));
  expect(process.exit).toHaveBeenCalledTimes(1);
});

it("should do nothing if pre-commit hooks already exits", () => {
  mockReadPkgUp.mockReturnValue({ pkg: { name: "some project" } });
  mockExistsSync.mockReturnValue(true);

  const precommit = require("../pre-commit").default;
  precommit("/projectPath");

  expect(console.log).toHaveBeenCalledWith(expect.stringMatching("😎"));
  expect(process.exit).toHaveBeenCalledTimes(1);
});

it("should write file pre-commit does not exits yet", () => {
  mockReadPkgUp.mockReturnValue({ pkg: { name: "some project" } });
  mockExistsSync.mockReturnValue(false);

  const precommit = require("../pre-commit").default;
  precommit("/projectPath");

  expect(console.log).toHaveBeenCalledWith(expect.stringMatching("✅"));
  expect(mockWriteFileSync).toHaveBeenCalledTimes(1);
});

it("should write file into correct path", () => {
  mockReadPkgUp.mockReturnValue({ pkg: { name: "some project" } });

  const precommit = require("../pre-commit").default;
  precommit("/projectPath");

  expect(mockReadPkgUp).toHaveBeenCalledWith({ cwd: "/projectPath" });
  expect(mockWriteFileSync).toHaveBeenCalledWith(
    "/projectPath/.git/hooks/pre-commit",
    expect.stringMatching(/npx dudejs staged/),
    { mode: 493 },
  );
});
