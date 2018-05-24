const mockSpawn = jest.fn();

jest.mock("cross-spawn", () => ({
  sync: mockSpawn,
}));

jest.mock("../../utils/getClientWorkingDir", () => () => "/client/working/dir");
jest.mock("../../utils/getLocalConfigurationFile", () => fileName =>
  `/local/configuration/${fileName}`,
);
jest.mock("../../utils/getPathToBin", () => bin => `/path/to/bin/${bin}`);

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
    "/path/to/bin/prettier",
    [
      "/client/working/dir/src/**/*.{js,json}",
      "--config",
      "/local/configuration/prettierrc.js",
      "--ignore-path",
      "/local/configuration/prettierignore",
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
    "/path/to/bin/prettier",
    [
      "file.js",
      "--config",
      "/local/configuration/prettierrc.js",
      "--ignore-path",
      "/local/configuration/prettierignore",
      "--write",
    ],
    { stdio: "inherit" },
  );
  expect(process.exit).toHaveBeenCalledWith(0);
});

it("launches prettier command with expected arguments for multiple files", () => {
  process.exit = jest.fn();
  process.argv = ["node", "exe", "1.js", "2.js", "3.js"];

  mockSpawn.mockImplementation(() => ({
    status: 0,
  }));

  require("../dudejs-format");

  expect(mockSpawn).toHaveBeenCalledWith(
    "/path/to/bin/prettier",
    [
      "1.js",
      "2.js",
      "3.js",
      "--config",
      "/local/configuration/prettierrc.js",
      "--ignore-path",
      "/local/configuration/prettierignore",
      "--write",
    ],
    { stdio: "inherit" },
  );
  expect(process.exit).toHaveBeenCalledWith(0);
});
