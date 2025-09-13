import { atom } from "recoil";

export const formPolygonState = atom({
  key: "formPolygonState",
  default: {
    polygonClosed: false,
    points: [],
    drawMode: false,
    data: { sirens: [] },
  },
});
