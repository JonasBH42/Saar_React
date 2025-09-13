import { resetObjectsValues } from "./resetObjectsValues";

describe("reset all object values to 0 except the key list", () => {
  test("wont change", () => {
    expect(resetObjectsValues([{ a: 3, b: 5 }], ["a", "b"])).toStrictEqual([
      { a: 3, b: 5 },
    ]);
  });

  test("will reset one key", () => {
    expect(
      resetObjectsValues([{ a: 3, b: 5, c: 32 }], ["a", "b"])
    ).toStrictEqual([{ a: 3, b: 5, c: 0 }]);
  });

  test("will reset two keys", () => {
    expect(
      resetObjectsValues([{ a: 3, b: 5, c: 32, d: 12 }], ["a", "b"])
    ).toStrictEqual([{ a: 3, b: 5, c: 0, d: 0 }]);
  });
});
