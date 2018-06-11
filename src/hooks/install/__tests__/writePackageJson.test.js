/* eslint no-console: 0 */

console.log = jest.fn();
process.exit = jest.fn();

const mockWriteFileSync = jest.fn();
const mockReadPkgUp = jest.fn(() => ({
  pkg: {
    name: "some project",
    scripts: {
      start: "node start",
      test: "jest test",
    },
  },
}));

jest.mock("read-pkg-up", () => ({
  sync: mockReadPkgUp,
}));

jest.mock("fs", () => ({
  realpathSync: jest.fn(data => data),
  writeFileSync: mockWriteFileSync,
}));

beforeEach(() => {
  jest.resetAllMocks();
  jest.resetModules();
});

it("should log an error if no package.json found", () => {
  mockReadPkgUp.mockReturnValue({ pkg: null });

  const writePackageJson = require("../writePackageJson").default;
  writePackageJson("/projectPath");

  expect(console.log).toHaveBeenCalledWith(expect.stringMatching("❌"));
  expect(process.exit).toHaveBeenCalledTimes(1);
});

it("should write new package.json with commands", () => {
  mockReadPkgUp.mockReturnValue({
    pkg: {
      name: "some project",
      scripts: {
        start: "node start",
        test: "jest test",
      },
    },
  });

  const writePackageJson = require("../writePackageJson").default;
  writePackageJson("/projectPath");

  expect(console.log).toHaveBeenCalledWith(expect.stringMatching("✅"));
  expect(mockWriteFileSync).toHaveBeenCalledTimes(1);
  expect(mockWriteFileSync.mock.calls[0]).toMatchSnapshot();
});

it("should log if write method fails", () => {
  mockReadPkgUp.mockReturnValue({
    pkg: {
      name: "some project",
      scripts: {
        start: "node start",
        test: "jest test",
      },
    },
  });

  mockWriteFileSync.mockImplementation(() => {
    throw new Error();
  });

  const writePackageJson = require("../writePackageJson").default;
  writePackageJson("/projectPath");

  expect(console.log).toHaveBeenCalledWith(expect.stringMatching("❌"));
});
