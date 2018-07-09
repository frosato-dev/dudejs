import addHook from "../utils/addHook";

export default () => addHook("commit-msg", ["npx dudejs msg ${1}"]);
