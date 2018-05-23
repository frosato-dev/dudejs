const mockHasDependency = jest.fn();

jest.mock("../../utils/hasDependency", () => mockHasDependency);
jest.mock("../prettierrc", () => ({
  inheritedPrettierConfig: true,
}));

beforeEach(() => {
  jest.resetModules();
});

it("returns expected eslint configuration", () => {
  require("../../utils/hasDependency").mockImplementation(() => false);

  expect(require("../eslintrc")).toMatchSnapshot();
});

it("returns expected eslint configuration when react found", () => {
  require("../../utils/hasDependency").mockImplementation(name => name === "react");

  expect(require("../eslintrc")).toMatchSnapshot();
});

it("returns expected eslint configuration when jest found", () => {
  require("../../utils/hasDependency").mockImplementation(name => name === "jest");

  expect(require("../eslintrc")).toMatchSnapshot();
});
