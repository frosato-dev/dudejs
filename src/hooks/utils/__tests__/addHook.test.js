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
  realpathSync: jest.fn(data => data),
  existsSync: mockExistsSync,
  writeFileSync: mockWriteFileSync,
}));

beforeEach(() => {
  jest.resetAllMocks();
  jest.resetModules();
});

it("should do nothing if no package.json found", () => {
  mockReadPkgUp.mockReturnValue({ pkg: null });

  const addHook = require("../addHook").default;
  addHook("hookName");

  expect(console.log).toHaveBeenCalledWith(expect.stringMatching("❌"));
  expect(process.exit).toHaveBeenCalledTimes(1);
});

it("should do nothing if hooks already exits", () => {
  mockReadPkgUp.mockReturnValue({ pkg: { name: "some project" } });
  mockExistsSync.mockReturnValue(true);

  const addHook = require("../addHook").default;
  addHook("hookName");

  expect(console.log).toHaveBeenCalledWith(expect.stringMatching("😎"));
  expect(process.exit).toHaveBeenCalledTimes(1);
});

it("should write file if it does not exits yet", () => {
  mockReadPkgUp.mockReturnValue({ pkg: { name: "some project" } });
  mockExistsSync.mockReturnValue(false);

  const addHook = require("../addHook").default;
  addHook("hookName");

  expect(console.log).toHaveBeenCalledWith(expect.stringMatching("✅"));
  expect(mockWriteFileSync).toHaveBeenCalledTimes(1);
});

it("should write hook into correct path", () => {
  mockReadPkgUp.mockReturnValue({ cwd: "user/project" });

  global.process.cwd = () => "user/project/node_modules/dudejs";

  const addHook = require("../addHook").default;
  addHook("pre-commit", ["npx dudejs staged"]);

  expect(mockReadPkgUp).toHaveBeenCalledWith({ cwd: "user/project" });
  expect(mockWriteFileSync).toHaveBeenCalledWith(
    "user/project/.git/hooks/pre-commit",
    expect.stringMatching(/npx dudejs staged/),
    { mode: 493 },
  );
});
