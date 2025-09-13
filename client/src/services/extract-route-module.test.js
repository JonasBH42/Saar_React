import { extractFromRoute } from "./extract-route-module";

describe("extractFromRoute", () => {
  test("Extract zero word from route:", () => {
    expect(extractFromRoute("/home/events", 0)).toBe("");
  });

  test("Extract first word from route:", () => {
    expect(extractFromRoute("/home/events", 1)).toBe("home");
  });

  test("Extract second word from route:", () => {
    expect(extractFromRoute("/home/events", 2)).toBe("events");
  });

  test("Out of bound index:", () => {
    expect(extractFromRoute("/home/events", 3)).toBeUndefined();
  });
});
