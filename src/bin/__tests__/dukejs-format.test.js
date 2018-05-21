const mockSpawn = jest.fn();

jest.mock("cross-spawn", () => ({
  sync: mockSpawn,
}));

it("launches prettier command with expected arguments", () => {
  process.exit = jest.fn();
  mockSpawn.mockImplementation(() => ({
    status: 0,
  }));

  require("../dukejs-format");

  expect(mockSpawn).toHaveBeenCalledWith(
    expect.stringMatching(/\/prettier\/bin-prettier.js$/),
    [
      "src/**/*.{js,json}",
      "--config",
      "./src/configs/prettierrc.js",
      "--ignore-path",
      "./src/configs/prettierignore",
      "--write",
    ],
    { stdio: "inherit" },
  );
  expect(process.exit).toHaveBeenCalledWith(0);
});
