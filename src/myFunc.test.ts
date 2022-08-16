import { myFunc } from "./myFunc";

test(" 1 + 2 = 3", () => {
  expect(myFunc(1, 2)).toBe(3);
});
