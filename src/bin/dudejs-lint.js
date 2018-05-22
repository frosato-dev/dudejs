import program from "commander";
import spawn from "cross-spawn";
import path from "path";

import getClientWorkingDir from "../utils/getClientWorkingDir";
import getPathToBin from "../utils/getPathToBin";
import getLocalConfigurationFile from "../utils/getLocalConfigurationFile";

program.parse(process.argv);

const [fileName] = program.args;

const workingDirectory = getClientWorkingDir();

const eslintDefaultConfig = getLocalConfigurationFile("eslintrc.js");
const targetPath = fileName || path.join(workingDirectory, "src");

const commandArgs = [targetPath, "--config", eslintDefaultConfig, "--fix"];

const eslint = getPathToBin("eslint");

const result = spawn.sync(eslint, [...commandArgs], { stdio: "inherit" });

process.exit(result.status);
