#!/usr/bin/env node

// https://github.com/tj/commander.js
import program from "commander";

program
  .command("lint [... filenames]", "run lint", { noHelp: true })
  .command("format [... filenames]", "run format", { noHelp: true })
  .command("staged", "run lint + format on staged files", { noHelp: true })
  .parse(process.argv);
