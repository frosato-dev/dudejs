/* eslint no-console: 0 */
const mockSpawn = jest.fn();
const mockSgf = jest.fn();

console.log = jest.fn();
process.exit = jest.fn();

jest.mock("staged-git-files", () => mockSgf);
jest.mock("cross-spawn", () => ({
  sync: mockSpawn,
}));

jest.mock("../../utils/getClientWorkingDir", () => () => "/client/working/dir");

beforeEach(() => {
  jest.resetModules();
  mockSpawn.mockReset();
  console.log.mockReset();
});

it("outputs a success message if there is nothing in stage", () => {
  mockSgf.mockImplementation(cb => cb(null, []));

  require("../dudejs-staged");

  expect(console.log).toHaveBeenCalledWith(expect.stringMatching("✅"));
  expect(mockSpawn).not.toHaveBeenCalled();
});

it("outputs a success message if there is no .js|json files added or modified in stage", () => {
  mockSgf.mockImplementation(cb =>
    cb(null, [
      { status: "Added", filename: "src/README.md" },
      { status: "Modified", filename: "src/styles.css" },
      { status: "Copied", filename: "src/index.js" },
      { status: "Renamed", filename: "src/data.json" },
    ]),
  );

  require("../dudejs-staged");

  expect(console.log).toHaveBeenCalledWith(expect.stringMatching("✅"));
  expect(mockSpawn).not.toHaveBeenCalled();
});

it("calls dudejs lint on each .js files", () => {
  mockSgf.mockImplementation(cb =>
    cb(null, [
      { status: "Added", filename: "src/index.js" },
      { status: "Added", filename: "src/README.md" },
      { status: "Modified", filename: "src/module.js" },
    ]),
  );
  mockSpawn.mockImplementation(() => ({ status: 0 }));

  require("../dudejs-staged");

  expect(mockSpawn).toHaveBeenCalledWith(
    "/client/working/dir/node_modules/.bin/dudejs",
    ["lint", "src/index.js", "src/module.js"],
    { stdio: "inherit" },
  );
});

it("calls dudejs format on each .js|json files", () => {
  mockSgf.mockImplementation(cb =>
    cb(null, [
      { status: "Added", filename: "src/index.js" },
      { status: "Added", filename: "src/README.md" },
      { status: "Modified", filename: "src/data.json" },
    ]),
  );
  mockSpawn.mockImplementation(() => ({ status: 0 }));

  require("../dudejs-staged");

  expect(mockSpawn).toHaveBeenCalledWith(
    "/client/working/dir/node_modules/.bin/dudejs",
    ["format", "src/index.js", "src/data.json"],
    { stdio: "inherit" },
  );
});

it("outputs an error message and exit if the spawn status is 1", () => {
  mockSgf.mockImplementation(cb =>
    cb(null, [
      { status: "Added", filename: "src/index.js" },
      { status: "Added", filename: "src/README.md" },
      { status: "Modified", filename: "src/data.json" },
    ]),
  );
  mockSpawn.mockImplementation(() => ({ status: 1 }));

  require("../dudejs-staged");

  expect(console.log).toHaveBeenCalledWith(expect.stringMatching("❌"));
  expect(process.exit).toHaveBeenCalledWith(1);
});

it("outputs error if staged-git-files fails", () => {
  const sgfError = "staged-git-files ERROR";
  mockSgf.mockImplementation(cb => cb(sgfError));

  require("../dudejs-staged");

  expect(console.log).toHaveBeenCalledWith(sgfError);
  expect(process.exit).toHaveBeenCalledWith(1);
});
