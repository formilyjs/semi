import dayjs from "dayjs";
import { momentable } from "../src/__builtins__/moment";

test("momentable is usable", () => {
  expect(dayjs.isDayjs(momentable("2021-09-08"))).toBe(true);
  expect(
    momentable(["2021-09-08", "2021-12-29"]).every((item) =>
      dayjs.isDayjs(item)
    )
  ).toBe(true);
});
