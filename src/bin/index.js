#!/usr/bin/env node

// https://github.com/tj/commander.js
import program from "commander";

program
  .command("lint [filename]", "run lint", { noHelp: true })
  .command("format [filename]", "run format", { noHelp: true })
  .command("staged", "run lint + format on staged files", { noHelp: true })
  .parse(process.argv);
