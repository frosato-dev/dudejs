/* eslint no-console: 0 */

const mockLintMessage = jest.fn(() => []);
const mockReadFileSync = jest.fn(value => value);
const mockExistsSync = jest.fn(() => true);

console.log = jest.fn();
process.exit = jest.fn();

jest.mock("../../utils/lintMessage", () => mockLintMessage);
jest.mock("fs", () => ({
  existsSync: mockExistsSync,
  readFileSync: mockReadFileSync,
}));

beforeEach(() => {
  jest.resetModules();
  console.log.mockReset();
  process.exit.mockReset();
});

it("should call lintMessage", () => {
  process.argv = ["", "", "commitMessagePath"];
  require("../dudejs-msg");
  expect(mockLintMessage).toHaveBeenCalledWith("commitMessagePath");
});

it("should call process.exit without error", async () => {
  process.argv = ["", "", "commitMessagePath"];
  mockLintMessage.mockReturnValue([]);
  await require("../dudejs-msg");
  expect(process.exit).toHaveBeenCalledWith(0);
  expect(console.log).toHaveBeenCalledWith(expect.stringMatching("✅"));
});

it("should call process.exit with errors", async () => {
  process.argv = ["", "", "commitMessagePath"];
  mockLintMessage.mockReturnValue([
    { message: "error 1" },
    { message: "error 2" },
    { message: "error 3" },
  ]);
  await require("../dudejs-msg");
  expect(process.exit).toHaveBeenCalledWith(1);
  expect(console.log).toHaveBeenCalledTimes(4);
  expect(console.log).toHaveBeenCalledWith(expect.stringMatching("⚠️️"));
  expect(console.log).toHaveBeenCalledWith(expect.stringMatching("❌"));
});
