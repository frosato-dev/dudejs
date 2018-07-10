/* eslint no-console: 0 */
import path from "path";
import fs from "fs";

export default cwd => {
  const gitHookPath = path.join(cwd, ".git", "hooks");
  const filePath = path.join(gitHookPath, "pre-commit");
  if (fs.existsSync(filePath)) {
    const hookFileContent = fs.readFileSync(filePath).toString();
    const lines = hookFileContent.split("\n");
    const fromLine = lines.findIndex(content => content === "#### DudeJS - START ####");
    const toLine = lines.findIndex(content => content === "#### DudeJS - END ####");
    if (fromLine !== -1 && toLine !== -1) {
      const newFileContent = lines
        .filter((_, index) => index < fromLine || index > toLine)
        .join("\n");
      if (newFileContent.trim() === "") {
        fs.unlinkSync(filePath);
      } else {
        fs.writeFileSync(filePath, newFileContent, { mode: 0o755 });
      }
      console.log("✅  DudeJS successfully remove git hooks");
    }
  }
};
