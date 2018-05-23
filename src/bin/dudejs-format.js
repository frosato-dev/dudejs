import spawn from "cross-spawn";

import getClientWorkingDir from "../utils/getClientWorkingDir";
import getLocalConfigurationFile from "../utils/getLocalConfigurationFile";
import getPathToBin from "../utils/getPathToBin";

const PRETTIER_CONFIG_FILENAME = "prettierrc.js";
const PRETTIER_IGNORE_FILENAME = "prettierignore";

const clientWorkingDir = getClientWorkingDir();

const prettierConfig = getLocalConfigurationFile(PRETTIER_CONFIG_FILENAME);
const prettierIgnore = getLocalConfigurationFile(PRETTIER_IGNORE_FILENAME);

const buildPathFromClientWorkingDir = (...path) => path.join(clientWorkingDir, ...path);
const targetPath = buildPathFromClientWorkingDir("src/**/*.{js,json}");

const commandArgs = [
  targetPath,
  "--config",
  prettierConfig,
  "--ignore-path",
  prettierIgnore,
  "--write",
];

const prettier = getPathToBin("prettier");

const result = spawn.sync(prettier, [...commandArgs], { stdio: "inherit" });

process.exit(result.status);
