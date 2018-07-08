const mockPrecommit = jest.fn();
const mockWritePackage = jest.fn();

jest.mock("../pre-commit", () => mockPrecommit);
jest.mock("../writePackageJson", () => mockWritePackage);

beforeEach(() => {
  jest.resetModules();
});

it("should call methods", () => {
  require("../index");
  expect(mockPrecommit).toHaveBeenCalledTimes(1);
  expect(mockWritePackage).toHaveBeenCalledTimes(1);
});
