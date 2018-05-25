import mockFs from "mock-fs";
import getPathToBin from "../getPathToBin";

afterEach(() => {
  jest.resetModules();
  mockFs.restore();
});

const mockPackageJSON = fakePackage =>
  mockFs({
    node_modules: {
      formatter: {
        "package.json": JSON.stringify(fakePackage),
      },
      // dependency needed by `require`
      "strip-bom": {
        "index.js": `module.exports = x => x.charCodeAt(0) === 0xFEFF ? x.slice(1) : x`,
      },
    },
  });

it("returns the relative path to the given file name", () => {
  mockPackageJSON({
    bin: "./.bin/exe",
  });

  const pathToBin = getPathToBin("formatter");

  expect(pathToBin).toBeDefined();
  expect(pathToBin).toMatch(/\/node_modules\/formatter\/\.bin\/exe$/);
});

it("supports nested bin in package.json", () => {
  mockPackageJSON({
    bin: { formatter: "./.bin/exe" },
  });

  const pathToBin = getPathToBin("formatter");

  expect(pathToBin).toBeDefined();
  expect(pathToBin).toMatch(/\/node_modules\/formatter\/\.bin\/exe$/);
});
