const mockSpawn = jest.fn();

jest.mock("cross-spawn", () => ({
  sync: mockSpawn,
}));

beforeEach(() => {
  jest.resetModules();
  mockSpawn.mockReset();
});

it("launches eslint command with expected arguments", () => {
  process.exit = jest.fn();
  process.argv = ["node", "exe"];

  mockSpawn.mockImplementation(() => ({
    status: 0,
  }));

  require("../dudejs-lint");

  expect(mockSpawn).toHaveBeenCalledWith(
    expect.stringMatching(/\/eslint\/bin\/eslint.js$/),
    [expect.stringMatching(/\/dudejs\/src$/), "--config", "./src/configs/eslintrc.js", "--fix"],
    { stdio: "inherit" },
  );
  expect(process.exit).toHaveBeenCalledWith(0);
});

it("launches eslint command with expected arguments for a single file", () => {
  process.exit = jest.fn();
  process.argv = ["node", "exe", "file.js"];

  mockSpawn.mockImplementation(() => ({
    status: 0,
  }));

  require("../dudejs-lint");

  expect(mockSpawn).toHaveBeenCalledWith(
    expect.stringMatching(/\/eslint\/bin\/eslint.js$/),
    ["file.js", "--config", "./src/configs/eslintrc.js", "--fix"],
    { stdio: "inherit" },
  );
  expect(process.exit).toHaveBeenCalledWith(0);
});
