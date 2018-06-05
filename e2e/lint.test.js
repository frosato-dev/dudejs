import { exec, write, cleanSrcDirectory, unifyTmpDir } from "./utils";
import { CLIENT_DIR } from "./constants";

const FILE_1_PATH = `${CLIENT_DIR}/src/toLint-1.js`;
const FILE_2_PATH = `${CLIENT_DIR}/src/toLint-2.js`;

beforeAll(() => {
  cleanSrcDirectory();
  write(FILE_1_PATH, `const unused = 1`);
  write(FILE_2_PATH, `console.log('Hello')`);
});

it("should lint all .js files under `src` directory", () => {
  let stdout;
  try {
    exec("./node_modules/.bin/dudejs lint");
  } catch (err) {
    stdout = err.stdout.toString();
  }
  expect(stdout).toBeDefined();
  expect(unifyTmpDir(stdout)).toMatchSnapshot();
});
