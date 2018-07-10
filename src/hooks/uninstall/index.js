import fs from "fs";
import path from "path";

import removeHooks from "./remove-hooks";
import removeTasks from "./remove-tasks";

const modulePath = fs.realpathSync(process.cwd());
const clientProjectPath = path.join(modulePath, "../..");

removeHooks(clientProjectPath);
removeTasks(clientProjectPath);
