const mockPrecommit = jest.fn();

jest.mock("../pre-commit", () => mockPrecommit);

beforeEach(() => {
  jest.resetModules();
});

it("should call pre-commit default method", () => {
  require("../index");
  expect(mockPrecommit).toHaveBeenCalledTimes(1);
});
