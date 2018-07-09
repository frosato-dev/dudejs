/* eslint no-console: 0 */
const mockWriteFileSync = jest.fn();
const mockReadFileSync = jest.fn();
const mockExistsSync = jest.fn();
const mockUnlinkSync = jest.fn();

console.log = jest.fn();

jest.mock("fs", () => ({
  existsSync: mockExistsSync,
  writeFileSync: mockWriteFileSync,
  readFileSync: mockReadFileSync,
  unlinkSync: mockUnlinkSync,
}));

beforeEach(() => {
  jest.resetAllMocks();
  jest.resetModules();
});

it("should do nothing if pre-commit hook file not found", () => {
  mockExistsSync.mockReturnValue(false);

  const removeHooks = require("../remove-hooks").default;
  removeHooks("/projectPath");

  expect(console.log).not.toHaveBeenCalled();
});

it("should do nothing if precommit hook script not found", () => {
  mockExistsSync.mockReturnValue(true);
  mockReadFileSync.mockReturnValue("some content");

  const removeHooks = require("../remove-hooks").default;
  removeHooks("/projectPath");

  expect(console.log).not.toHaveBeenCalled();
});

it("should remove precommit hook script from file", () => {
  mockExistsSync.mockReturnValue(true);
  mockReadFileSync.mockReturnValue(`do --something;
#### DudeJS - START ####
1
2
3
#### DudeJS - END ####
do --something-else;`);

  const removeHooks = require("../remove-hooks").default;
  removeHooks("/projectPath");

  expect(mockWriteFileSync).toHaveBeenCalledWith(
    "/projectPath/.git/hooks/pre-commit",
    "do --something;\ndo --something-else;",
    { mode: 0o755 },
  );
  expect(console.log).toHaveBeenCalledWith(expect.stringMatching("✅"));
});

it("should remove precommit hook file if empty after clean", () => {
  mockExistsSync.mockReturnValue(true);
  mockReadFileSync.mockReturnValue(`
#### DudeJS - START ####
1
2
3
#### DudeJS - END ####
  `);

  const removeHooks = require("../remove-hooks").default;
  removeHooks("/projectPath");

  expect(mockUnlinkSync).toHaveBeenCalledWith("/projectPath/.git/hooks/pre-commit");
  expect(console.log).toHaveBeenCalledWith(expect.stringMatching("✅"));
});
