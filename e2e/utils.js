import fs from "fs";
import rimraf from "rimraf";
import { CLIENT_DIR } from "./constants";
import { execSync } from "child_process";

export const exec = cmd => execSync(cmd, { cwd: CLIENT_DIR, windowsHide: true });

export const read = filePath => fs.readFileSync(filePath, "utf-8").toString();

export const write = (filePath, content) => fs.writeFileSync(filePath, content);

export const fileExists = filePath => fs.existsSync(filePath);

export const cleanSrcDirectory = () => rimraf.sync(`${CLIENT_DIR}/src/*`);
