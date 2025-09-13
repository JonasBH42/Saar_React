import { atom } from "recoil";

export const polygonPositionsState = atom({
  key: "polygonPositionsState",
  default: { polygonClosed: false, points: [] },
});
