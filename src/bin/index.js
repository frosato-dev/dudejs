#!/usr/bin/env node

// https://github.com/tj/commander.js
import program from "commander";

program
  .command("lint", "run lint", { noHelp: true })
  .command("format", "run format", { noHelp: true })
  .parse(process.argv);
