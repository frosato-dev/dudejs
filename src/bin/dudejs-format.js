import program from "commander";
import spawn from "cross-spawn";
import path from "path";

import getClientWorkingDir from "../utils/getClientWorkingDir";
import getLocalConfigurationFile from "../utils/getLocalConfigurationFile";
import getPathToBin from "../utils/getPathToBin";

const PRETTIER_CONFIG_FILENAME = "prettierrc.js";
const PRETTIER_IGNORE_FILENAME = "prettierignore";

program.parse(process.argv);

const fileNames = program.args;

const clientWorkingDir = getClientWorkingDir();

const prettierConfig = getLocalConfigurationFile(PRETTIER_CONFIG_FILENAME);
const prettierIgnore = getLocalConfigurationFile(PRETTIER_IGNORE_FILENAME);

const targetFiles = fileNames.length
  ? fileNames
  : [path.join(clientWorkingDir, "src/**/*.{js,json}")];

const commandArgs = [
  ...targetFiles,
  "--config",
  prettierConfig,
  "--ignore-path",
  prettierIgnore,
  "--write",
];

const prettier = getPathToBin("prettier");

const result = spawn.sync(prettier, [...commandArgs], { stdio: "inherit" });

process.exit(result.status);
