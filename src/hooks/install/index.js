import fs from "fs";
import path from "path";

import commitMsg from "./commit-msg";
import preCommit from "./pre-commit";
import writePackageJson from "./writePackageJson";

const modulePath = fs.realpathSync(process.cwd());
const clientProjectPath = path.join(modulePath, "../..");

preCommit(clientProjectPath);
commitMsg();
writePackageJson(clientProjectPath);
