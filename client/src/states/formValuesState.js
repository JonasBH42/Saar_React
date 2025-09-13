import { atom } from "recoil";

export const formValuesState = atom({
  key: "formValuesState",
  default: { isActive: false, isDirty: false, isSubmitSuccessful: true },
});
