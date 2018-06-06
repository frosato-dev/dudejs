import addHook from "../utils/addHook";

export default () => addHook("pre-commit", ["npx dudejs staged"]);
