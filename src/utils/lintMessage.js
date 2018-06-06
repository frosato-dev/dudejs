import load from "@commitlint/load/lib/index";
import lint from "@commitlint/lint/lib/index";

export default async commitMessage => {
  const CONFIG = require("./../configs/commitlint");

  const options = await load(CONFIG);
  const report = await lint(commitMessage, options.rules);

  return report.errors;
};
