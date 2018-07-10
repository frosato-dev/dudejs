/* eslint no-console: 0 */
console.log = jest.fn();

const mockWriteFileSync = jest.fn();
const mockReadPkgUp = jest.fn();

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

it("should do nothing if package.json doesn't exists", () => {
  mockReadPkgUp.mockReturnValue({ pkg: null });

  const removeTasks = require("../remove-tasks").default;
  removeTasks("/projectPath");

  expect(console.log).not.toHaveBeenCalled();
});

it("should do nothing if package.json doesn't contains tasks", () => {
  mockReadPkgUp.mockReturnValue({ pkg: {} });

  const removeTasks = require("../remove-tasks").default;
  removeTasks("/projectPath");

  expect(console.log).not.toHaveBeenCalled();
});

it("should remove dude:* tasks from package.json", () => {
  mockReadPkgUp.mockReturnValue({
    pkg: {
      name: "some project",
      scripts: {
        "dude:format": "dudejs format",
        "dude:lint": "dudejs lint",
        start: "node start",
        test: "jest test",
      },
    },
  });

  const removeTasks = require("../remove-tasks").default;
  removeTasks("/projectPath");

  expect(mockWriteFileSync).toHaveBeenCalledWith(
    "/projectPath/package.json",
    JSON.stringify(
      {
        name: "some project",
        scripts: {
          start: "node start",
          test: "jest test",
        },
      },
      null,
      2,
    ),
    { mode: 0o755 },
  );

  expect(console.log).toHaveBeenCalledWith(expect.stringMatching("✅"));
});

it("should log error if write to package.json fails", () => {
  mockReadPkgUp.mockReturnValue({
    pkg: {
      name: "some project",
      scripts: {},
    },
  });

  mockWriteFileSync.mockImplementation(() => {
    throw new Error();
  });

  const removeTasks = require("../remove-tasks").default;
  removeTasks("/projectPath");

  expect(console.log).toHaveBeenCalledWith(expect.stringMatching("❌"));
});
