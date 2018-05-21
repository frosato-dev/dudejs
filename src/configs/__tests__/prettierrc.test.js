import prettierConfig from "../prettierrc";

it("returns expected prettier configuration", () => {
  expect(prettierConfig).toMatchSnapshot();
});
