const mockRemoveHooks = jest.fn();
const mockRemoveTasks = jest.fn();

jest.mock("../remove-hooks", () => mockRemoveHooks);
jest.mock("../remove-tasks", () => mockRemoveTasks);

beforeEach(() => {
  jest.resetModules();
});

it("should call methods", () => {
  require("../index");
  expect(mockRemoveHooks).toHaveBeenCalledTimes(1);
  expect(mockRemoveTasks).toHaveBeenCalledTimes(1);
});
