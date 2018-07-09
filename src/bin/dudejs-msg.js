/* eslint no-console: 0 */
import program from "commander";
import fs from "fs";

import lintMessage from "../utils/lintMessage";

program.parse(process.argv);

export const getCommitMessage = () => {
  const messagePath = program.args[0];
  return fs.readFileSync(messagePath).toString();
};

export const testCommitMessage = async () => {
  const commitMessage = getCommitMessage();
  const errors = await lintMessage(commitMessage);

  if (errors.length > 0) {
    errors.map(err => `⚠️️   Commit message : ${err.message}`).forEach(err => console.log(err));

    console.log(`❌  Sorry dude, your commit message sucks`);
    process.exit(1);
  } else {
    console.log("✅  Your commit message is sweet!");
    process.exit(0);
  }
};

testCommitMessage();
