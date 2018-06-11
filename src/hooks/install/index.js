import fs from "fs";
import path from "path";

import precommit from "./pre-commit";
import writePackageJson from "./writePackageJson";

const modulePath = fs.realpathSync(process.cwd());
const clientProjectPath = path.join(modulePath, "../..");

precommit(clientProjectPath);
writePackageJson(clientProjectPath);
