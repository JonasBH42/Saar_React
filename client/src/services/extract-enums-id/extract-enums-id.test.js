import { extractEnumsId } from "./extract-enums-id";

describe("extractEnumsId", () => {
  test("Empty object", () => {
    expect(extractEnumsId({})).toEqual({});
  });

  test("Object without enum", () => {
    expect(extractEnumsId({ aa: 7 })).toEqual({ aa: 7 });
  });

  test("Object with enum", () => {
    expect(extractEnumsId({ aa: 7, bla: { ID: 1 } })).toEqual({
      aa: 7,
      bla: 1,
    });
  });
});
