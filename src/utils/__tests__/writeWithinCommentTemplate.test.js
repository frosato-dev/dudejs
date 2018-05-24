import writeWithinCommentTemplate from "../writeWithinCommentTemplate";

it("should contain start and end comment tags", () => {
  const data = writeWithinCommentTemplate([]);
  expect(data).toEqual(expect.stringContaining("#### DudeJS - START ####"));
  expect(data).toEqual(expect.stringContaining("#### DudeJS - END ####"));
});

it("should contains given commands", () => {
  const data = writeWithinCommentTemplate(["npm run command1", "echo command2"]);
  expect(data).toEqual(expect.stringContaining("npm run command1\necho command2"));
});
