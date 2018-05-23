import getClientWorkingDir from "../getClientWorkingDir";

it("returns the path to the client working directory", () => {
  const workingDir = getClientWorkingDir();

  expect(workingDir).toBeDefined();
  expect(workingDir).toMatch(/\/dudejs$/);
});
