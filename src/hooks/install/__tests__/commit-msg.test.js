/* eslint no-console: 0 */
import addHook from "../../utils/addHook";
import commitMsg from "../commit-msg";

jest.mock("../../utils/addHook");
const mockAddHook = jest.fn();
addHook.mockImplementation(mockAddHook);

afterEach(() => {
  mockAddHook.mockReset();
});

it("should call addHook method once", () => {
  commitMsg();
  expect(mockAddHook).toHaveBeenCalledTimes(1);
});

it("should call addHook with good arguments", () => {
  commitMsg();
  expect(mockAddHook).toHaveBeenCalledWith("commit-msg", ["npx dudejs msg ${1}"]);
});
