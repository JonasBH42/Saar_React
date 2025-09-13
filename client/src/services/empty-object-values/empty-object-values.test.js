import { emptyObjectValues } from "./empty-object-values";

describe("emptyObjectValues", () => {
  test("Empty object", () => {
    expect(emptyObjectValues({})).toEqual({});
  });

  test("Object with one key", () => {
    expect(emptyObjectValues({ sirens: [1, 2, 3] })).toEqual({ sirens: [] });
  });

  test("Object with several keys", () => {
    expect(
      emptyObjectValues({
        sirens: [1, 2, 3],
        schools: [1, 2, 3],
        banana: [1, 2, 3],
      })
    ).toEqual({
      sirens: [],
      schools: [],
      banana: [],
    });
  });
});
