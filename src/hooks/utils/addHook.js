import path from "path";
import fs from "fs";
import readPkgUp from "read-pkg-up";
import writeWithinCommentTemplate from "./../../utils/writeWithinCommentTemplate";

const modulePath = fs.realpathSync(process.cwd());
const clientProjectPath = path.join(modulePath, "../..");
const gitHookPath = path.join(clientProjectPath, ".git", "hooks");

export default (hookName, commands = []) => {
  const { pkg: packageJson } = readPkgUp.sync({ cwd: clientProjectPath });

  if (!packageJson) {
    //eslint-disable-next-line
    console.log(
      `❌ DudeJS was not able to add ${hookName} hook, come on dude did you forget to git init?`,
    );
    process.exit();
  }

  const filePath = path.join(gitHookPath, hookName);

  if (fs.existsSync(filePath)) {
    //eslint-disable-next-line
    console.log(
      `😎 Seems you already have a ${hookName} hook, DudeJS hasn't done anything and he likes it.`,
    );
    process.exit();
  }

  const fileContent = writeWithinCommentTemplate(commands);
  fs.writeFileSync(filePath, fileContent, { mode: 0o755 });

  //eslint-disable-next-line
  console.log(`✅ DudeJS successfully installed ${hookName} hook for you.`);
};
