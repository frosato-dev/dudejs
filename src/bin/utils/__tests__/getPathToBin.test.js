import mockFs from "mock-fs";
import getPathToBin from "../getPathToBin";

afterAll(() => {
  mockFs.restore();
});

it("returns the relative path to the given file name", () => {
  const fakePackage = {
    bin: "./.bin/exe",
  };

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

  const pathToBin = getPathToBin("formatter");

  expect(pathToBin).toBeDefined();
  expect(pathToBin).toMatch(/\/node_modules\/formatter\/\.bin\/exe$/);
});
