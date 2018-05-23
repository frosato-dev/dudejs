import getLocalConfigurationFile from "../getLocalConfigurationFile";

it("returns the relative path to the given file name", () => {
  const configPath = getLocalConfigurationFile("config.js");

  expect(configPath).toBeDefined();
  expect(configPath).toEqual("./src/configs/config.js");
});
