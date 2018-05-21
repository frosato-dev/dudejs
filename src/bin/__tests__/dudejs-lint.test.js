const mockSpawn = jest.fn();

jest.mock("cross-spawn", () => ({
  sync: mockSpawn,
}));

it("launches eslint command with expected arguments", () => {
  process.exit = jest.fn();
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
