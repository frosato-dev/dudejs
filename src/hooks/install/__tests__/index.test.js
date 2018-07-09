const mockPrecommit = jest.fn();
const mockWritePackage = jest.fn();
const mockCommitMsg = jest.fn();

jest.mock("../pre-commit", () => mockPrecommit);
jest.mock("../writePackageJson", () => mockWritePackage);
jest.mock("../commit-msg", () => mockCommitMsg);

beforeEach(() => {
  jest.resetModules();
});

it("should call methods", () => {
  require("../index");
  expect(mockPrecommit).toHaveBeenCalledTimes(1);
  expect(mockWritePackage).toHaveBeenCalledTimes(1);
  expect(mockCommitMsg).toHaveBeenCalledTimes(1);
});
