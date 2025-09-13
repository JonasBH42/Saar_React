import {
  replaceMultipleChars,
  convertDataValues,
  replaceDateToJsFormat,
} from "./parserFunctions";

describe("replaceMultipleChars", () => {
  test("replace all _ with spaces", () => {
    expect(replaceMultipleChars("בדיקת_שינוי_רווח", "_", " ")).toBe(
      "בדיקת שינוי רווח"
    );
  });

  test(`replace all '' with "`, () => {
    expect(replaceMultipleChars("בדיקת שינוי ''", "''", '"')).toBe(
      `בדיקת שינוי "`
    );
  });
});

describe("convertEventsValues", () => {
  test(`test empty string`, () => {
    expect(convertDataValues("", null)).toBeUndefined;
  });

  test(`test string with ''`, () => {
    expect(convertDataValues(`בדיקת שינוי ''`, null)).toBe(`בדיקת שינוי "`);
  });

  test(`test yes no`, () => {
    expect(convertDataValues(`כן`, null)).toBe(true);
    expect(convertDataValues(`לא`, null)).toBe(false);
  });

  test(`test labels dictionary`, () => {
    expect(convertDataValues(`הרס`, { הרס: 1 })).toBe(1);
    expect(convertDataValues(`אחר`, { הרס: 1 })).toBe("אחר");
  });
});

describe("replaceDateToJsFormat", () => {
  test(`test function`, () => {
    expect(replaceDateToJsFormat(`09:32 31/01/2022`)).toStrictEqual(
      new Date("2022-01-31T09:32:00")
    );
  });
});
