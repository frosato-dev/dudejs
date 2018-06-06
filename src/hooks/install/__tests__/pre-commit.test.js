/* eslint no-console: 0 */
import addHook from "../../utils/addHook";
import precommit from "../pre-commit";

jest.mock("../../utils/addHook");
const mockAddHook = jest.fn();
addHook.mockImplementation(mockAddHook);

afterEach(() => {
  mockAddHook.mockReset();
});

it("should call addHook method once", () => {
  precommit();
  expect(mockAddHook).toHaveBeenCalledTimes(1);
});

it("should call addHook with good arguments", () => {
  precommit();
  expect(mockAddHook).toHaveBeenCalledWith("pre-commit", ["npx dudejs staged"]);
});
