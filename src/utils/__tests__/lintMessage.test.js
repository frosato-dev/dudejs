const mockLint = jest.fn();
const mockLoad = jest.fn(() => ({
  rules: {},
}));

jest.mock("@commitlint/load", () => mockLoad);
jest.mock("@commitlint/lint", () => mockLint);

it("should call commitlint methods", async () => {
  mockLint.mockReturnValue({ errors: ["an error"] });
  const result = await require("../lintMessage").default("a commit message");
  expect(mockLoad).toHaveBeenCalled();
  expect(mockLint).toHaveBeenCalled();
  expect(result).toEqual(["an error"]);
});
