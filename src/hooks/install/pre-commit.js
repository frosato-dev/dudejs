import path from "path";
import fs from "fs";
import readPkgUp from "read-pkg-up";
import writeWithinCommentTemplate from "./../../utils/writeWithinCommentTemplate";

const modulePath = fs.realpathSync(process.cwd());
const clientProjectPath = path.join(modulePath, "../..");
const gitHookPath = path.join(clientProjectPath, ".git", "hooks");

export default () => {
  const { pkg: packageJson } = readPkgUp.sync({ cwd: clientProjectPath });

  if (!packageJson) {
    //eslint-disable-next-line
    console.log(
      "❌ DudeJS was not able to add pre-commit hook, come on dude did you forget to git init?",
    );
    process.exit();
  }

  const filePath = path.join(gitHookPath, "pre-commit");

  if (fs.existsSync(filePath)) {
    //eslint-disable-next-line
    console.log(
      "😎 Seems you already have a pre-commit hook, DudeJS hasn't done anything and he likes it.",
    );
    process.exit();
  }

  const fileContent = writeWithinCommentTemplate(["npm run dude:format", "npm run dude:lint"]);
  fs.writeFileSync(filePath, fileContent, { mode: 0o755 });

  //eslint-disable-next-line
  console.log("✅ DudeJS successfully installed pre-commit hook for you.");
};
