/* eslint no-console: 0 */
import sgf from "staged-git-files";
import { execSync } from "child_process";
import path from "path";

import getClientWorkingDir from "./utils/getClientWorkingDir";

const workingDirectory = getClientWorkingDir();

const dudeBin = path.join(workingDirectory, "node_modules", ".bin", "dudejs");
const lintCmd = `${dudeBin} lint`;
const formatCmd = `${dudeBin} format`;

sgf((err, results) => {
  if (!err) {
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

    for (const file of toLint) {
      try {
        execSync(`${lintCmd} ${file}`);
      } catch (err) {
        error = true;
        process.stdout.write(err.stdout);
      }
    }

    for (const file of toFormat) {
      try {
        execSync(`${formatCmd} ${file}`);
      } catch (err) {
        error = true;
        process.stdout.write(err.stdout);
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
