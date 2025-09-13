import { enumsObjsByLabels } from "@services";

describe("enumsObjsByLabels", () => {
  test("Empty object", () => {
    expect(enumsObjsByLabels({})).toStrictEqual({});
  });

  test("Object with empty array", () => {
    expect(
      enumsObjsByLabels({
        abc: [],
      })
    ).toStrictEqual({ abc: {} });
  });

  test("Enums Object with one property", () => {
    expect(
      enumsObjsByLabels({
        abc: [
          { ID: 1, Name: "example" },
          { ID: 2, Name: "bla" },
        ],
      })
    ).toStrictEqual({ abc: { example: 1, bla: 2 } });
  });

  test("Enums Object with more than one property", () => {
    expect(
      enumsObjsByLabels({
        abc: [
          { ID: 1, Name: "example" },
          { ID: 2, Name: "bla" },
        ],
        def: [
          { ID: 1, Name: "example2" },
          { ID: 3, Name: "bla2" },
        ],
      })
    ).toStrictEqual({
      abc: { example: 1, bla: 2 },
      def: { example2: 1, bla2: 3 },
    });
  });
});
