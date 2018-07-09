/* eslint no-console: 0 */
import fs from "fs";
import path from "path";
import readPkgUp from "read-pkg-up";
import _ from "lodash";

export default cwd => {
  const { pkg: packageJson } = readPkgUp.sync({ cwd });

  if (!packageJson || !packageJson.scripts) {
    return false;
  }

  const newPackageJson = {
    ...packageJson,
    scripts: _.omitBy(packageJson.scripts, (value, key) => /^dude:/.test(key)),
  };

  const data = JSON.stringify(newPackageJson, null, 2);
  const filePath = path.join(cwd, "package.json");

  try {
    fs.writeFileSync(filePath, data, { mode: 0o755 });
    console.log(`✅  DudeJS successfully remove commands to your package.json.`);
  } catch (error) {
    console.log(`❌  DudeJS encountered an error while writing ${filePath}: ${error}`);
  }
};
