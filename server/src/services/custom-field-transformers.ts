import { TransformFnParams } from "class-transformer";

export const removeNulls = ({ value }: TransformFnParams) =>
  value === null || value === "" ? undefined : value;

export const convertDates = ({ value }: TransformFnParams) =>
  value ? new Date(value) : undefined;
