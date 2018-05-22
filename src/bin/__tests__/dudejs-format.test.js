const mockSpawn = jest.fn();

jest.mock("cross-spawn", () => ({
  sync: mockSpawn,
}));

beforeEach(() => {
  jest.resetModules();
  mockSpawn.mockReset();
});

it("launches prettier command with expected arguments", () => {
  process.exit = jest.fn();
  process.argv = ["node", "exe"];

  mockSpawn.mockImplementation(() => ({
    status: 0,
  }));

  require("../dudejs-format");

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

it("launches prettier command with expected arguments for a single file", () => {
  process.exit = jest.fn();
  process.argv = ["node", "exe", "file.js"];

  mockSpawn.mockImplementation(() => ({
    status: 0,
  }));

  require("../dudejs-format");

  expect(mockSpawn).toHaveBeenCalledWith(
    expect.stringMatching(/\/prettier\/bin-prettier.js$/),
    [
      "file.js",
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
