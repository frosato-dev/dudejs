const mockHasDependency = jest.fn();

jest.mock("../../bin/utils/hasDependency", () => mockHasDependency);
jest.mock("../prettierrc", () => ({
  inheritedPrettierConfig: true,
}));

beforeEach(() => {
  jest.resetModules();
});

it("returns expected eslint configuration", () => {
  require("../../bin/utils/hasDependency").mockImplementation(() => false);

  expect(require("../eslintrc")).toMatchSnapshot();
});

it("returns expected eslint configuration when react found", () => {
  require("../../bin/utils/hasDependency").mockImplementation(name => name === "react");

  expect(require("../eslintrc")).toMatchSnapshot();
});

it("returns expected eslint configuration when jest found", () => {
  require("../../bin/utils/hasDependency").mockImplementation(name => name === "jest");

  expect(require("../eslintrc")).toMatchSnapshot();
});
