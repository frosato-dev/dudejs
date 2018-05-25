/* eslint no-console: 0 */
import sgf from "staged-git-files";
import spawn from "cross-spawn";
import path from "path";

import getClientWorkingDir from "../utils/getClientWorkingDir";

const workingDirectory = getClientWorkingDir();

const dudeBin = path.join(workingDirectory, "node_modules", ".bin", "dudejs");

sgf((err, results) => {
  if (err) {
    console.log(err);
    process.exit(1);
  } else {
    const toLint = [];
    const toFormat = [];

    results
      .filter(
        result =>
          (result.status === "Added" || result.status === "Modified") &&
          /^src\//.test(result.filename),
      )
      .forEach(result => {
        if (/\.js$/.test(result.filename)) {
          toLint.push(result.filename);
        }
        if (/\.(js|json)$/.test(result.filename)) {
          toFormat.push(result.filename);
        }
      });

    let error = false;

    if (toLint.length) {
      const result = spawn.sync(dudeBin, ["lint", ...toLint], { stdio: "inherit" });
      if (result.status === 1) {
        error = true;
      }
    }

    if (toFormat.length) {
      const result = spawn.sync(dudeBin, ["format", ...toFormat], { stdio: "inherit" });
      if (result.status === 1) {
        error = true;
      }
    }

    if (error) {
      console.log("❌  Sorry dude, you have to fix your error(s) and commit again, be strong!");
      process.exit(1);
    } else {
      console.log("✅  Everything is fine dude!");
    }
  }
});
