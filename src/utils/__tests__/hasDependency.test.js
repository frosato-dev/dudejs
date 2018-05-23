jest.mock("read-pkg-up", () => ({
  sync: jest.fn(),
}));

beforeEach(() => {
  jest.resetModules();
});

it("check dependencies from package.json", () => {
  require("read-pkg-up").sync.mockImplementation(() => ({
    pkg: {
      dependencies: {
        a: "0.0.1",
        react: "16.0.3",
        Z: "1.0.0",
      },
    },
  }));
  const hasDependency = require("../hasDependency").default;
  expect(hasDependency("react")).toBe(true);
});

it("check dev dependencies from package.json", () => {
  require("read-pkg-up").sync.mockImplementation(() => ({
    pkg: {
      devDependencies: {
        a: "0.0.1",
        react: "16.0.3",
        Z: "1.0.0",
      },
    },
  }));
  const hasDependency = require("../hasDependency").default;
  expect(hasDependency("react")).toBe(true);
});

it("check peer dependencies from package.json", () => {
  require("read-pkg-up").sync.mockImplementation(() => ({
    pkg: {
      peerDependencies: {
        a: "0.0.1",
        react: "16.0.3",
        Z: "1.0.0",
      },
    },
  }));
  const hasDependency = require("../hasDependency").default;
  expect(hasDependency("react")).toBe(true);
});

it("returns false when the dependency is not found", () => {
  require("read-pkg-up").sync.mockImplementation(() => ({
    pkg: {
      dependencies: {
        a: "0.0.1",
      },
      devDependencies: {
        b: "0.0.2",
      },
      peerDependencies: {
        c: "0.0.3",
      },
    },
  }));
  const hasDependency = require("../hasDependency").default;
  expect(hasDependency("react")).toBe(false);
});
