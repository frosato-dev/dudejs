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

  const precommit = require("../pre-commit").default;
  precommit();

  expect(console.log).toHaveBeenCalledWith(expect.stringMatching("❌"));
  expect(process.exit).toHaveBeenCalledTimes(1);
});

it("should do nothing if pre-commit hooks already exits", () => {
  mockReadPkgUp.mockReturnValue({ pkg: { name: "some project" } });
  mockExistsSync.mockReturnValue(true);

  const precommit = require("../pre-commit").default;
  precommit();

  expect(console.log).toHaveBeenCalledWith(expect.stringMatching("😎"));
  expect(process.exit).toHaveBeenCalledTimes(1);
});

it("should write file pre-commit does not exits yet", () => {
  mockReadPkgUp.mockReturnValue({ pkg: { name: "some project" } });
  mockExistsSync.mockReturnValue(false);

  const precommit = require("../pre-commit").default;
  precommit();

  expect(console.log).toHaveBeenCalledWith(expect.stringMatching("✅"));
  expect(mockWriteFileSync).toHaveBeenCalledTimes(1);
});

it("should write file into correct path", () => {
  mockReadPkgUp.mockReturnValue({ cwd: "user/project" });

  global.process.cwd = () => "user/project/node_modules/dudejs";

  const precommit = require("../pre-commit").default;
  precommit();

  expect(mockReadPkgUp).toHaveBeenCalledWith({ cwd: "user/project" });
  expect(mockWriteFileSync).toHaveBeenCalledWith(
    "user/project/.git/hooks/pre-commit",
    expect.stringMatching(/npm run dude:format\nnpm run dude:lint/),
    { mode: 493 },
  );
});
