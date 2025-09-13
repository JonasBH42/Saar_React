import {
  ellipseMaxCoordinates,
  ellipseMinCoordinates,
} from "./ellipse-functions";

describe("ellipse-functions", () => {
  test("get the max coordinate in case of (1,0):", () => {
    expect(ellipseMaxCoordinates(1, 0)).toBe(1);
  });
  test("get the max coordinate in case of (-1,0):", () => {
    expect(ellipseMaxCoordinates(-1, 0)).toBe(-1);
  });
  test("get the max coordinate in case of (0,1):", () => {
    expect(ellipseMaxCoordinates(0, 1)).toBe(1 / Math.sqrt(2) / 100);
  });
  test("get the min coordinate in case of (1,0):", () => {
    expect(ellipseMinCoordinates(1, 0)).toBe(1);
  });
  test("get the min coordinate in case of (-1,0):", () => {
    expect(ellipseMinCoordinates(-1, 0)).toBe(-1);
  });
  test("get the min coordinate in case of (0,1):", () => {
    expect(ellipseMinCoordinates(0, 1)).toBe(-1 / Math.sqrt(2) / 100);
  });
});
