import path from "path";
import { read } from "./utils";
import { CLIENT_DIR } from "./constants";

const PACKAGE_JSON_PATH = path.join(CLIENT_DIR, "package.json");


it("should have written dude commands", () => {
  const packageJsonString = read(PACKAGE_JSON_PATH)
  const packageJson = JSON.parse(packageJsonString)
  expect(packageJson.scripts['dude:fmt']).toEqual('dudejs format')
  expect(packageJson.scripts['dude:lint']).toEqual('dudejs lint')
});
