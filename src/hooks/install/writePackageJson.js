import fs from "fs";
import path from "path";
import readPkgUp from "read-pkg-up";

export default cwd => {
  const { pkg: packageJson } = readPkgUp.sync({ cwd });

  if (!packageJson) {
    //eslint-disable-next-line
    console.log(`❌ DudeJS was not able to find package.json in ${cwd}`);
    return process.exit();
  }

  const newPackageJson = {
    ...packageJson,
    scripts: {
      ...packageJson.scripts,
      ["dude:fmt"]: "dudejs format",
      ["dude:lint"]: "dudejs lint",
    },
  };

  const data = JSON.stringify(newPackageJson, null, 2);
  const filePath = path.join(cwd, "package.json");

  try {
    fs.writeFileSync(filePath, data, { mode: 0o755 });
    //eslint-disable-next-line
    console.log(`✅ DudeJS successfully add commands to your package.json.`);
  } catch (error) {
    //eslint-disable-next-line
    console.log(`❌ DudeJS encountered an error while writing ${filePath}: ${error}`);
  }
};
