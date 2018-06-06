const commitLintConfig = require("./commitlint");

it("returns expected commitlint configuration", () => {
  expect(commitLintConfig).toMatchSnapshot();
});
