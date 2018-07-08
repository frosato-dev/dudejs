import path from "path";
import fs from "fs";
import readPkgUp from "read-pkg-up";
import writeWithinCommentTemplate from "./../../utils/writeWithinCommentTemplate";

export default cwd => {
  const { pkg: packageJson } = readPkgUp.sync({ cwd });
  const gitHookPath = path.join(cwd, ".git", "hooks");

  if (!packageJson) {
    //eslint-disable-next-line
    console.log(
      "❌ DudeJS was not able to add pre-commit hook, come on dude did you forget to git init?",
    );
    return process.exit();
  }

  const filePath = path.join(gitHookPath, "pre-commit");

  if (fs.existsSync(filePath)) {
    //eslint-disable-next-line
    console.log(
      "😎 Seems you already have a pre-commit hook, DudeJS hasn't done anything and he likes it.",
    );
    return process.exit();
  }

  const fileContent = writeWithinCommentTemplate(["npx dudejs staged"]);
  fs.writeFileSync(filePath, fileContent, { mode: 0o755 });

  //eslint-disable-next-line
  console.log("✅ DudeJS successfully installed pre-commit hook for you.");
};
