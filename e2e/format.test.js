import { exec, read, write, cleanSrcDirectory } from "./utils";
import { CLIENT_DIR } from "./constants";

const FILE_1_PATH = `${CLIENT_DIR}/src/toFormat-1.js`;
const FILE_2_PATH = `${CLIENT_DIR}/src/toFormat-2.js`;

beforeAll(() => {
  cleanSrcDirectory();
  write(FILE_1_PATH, `const hello = "Hello";`);
  write(FILE_2_PATH, `const addOne = (number) =>        number   + 1`);
});

it("should format all .js files under `src` directory", () => {
  exec("./node_modules/.bin/dudejs format");
  expect(read(FILE_1_PATH)).toMatchSnapshot("file 1 content");
  expect(read(FILE_2_PATH)).toMatchSnapshot("file 2 content");
});
