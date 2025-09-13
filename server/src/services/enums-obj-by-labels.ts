import { Enum } from "@types";

type EnumsObject = { [key in string]: Enum[] };
type ReverseEnum = { [key in string]: number };
type ReverseEnumsObject = { [key in string]: ReverseEnum };

export const enumsObjsByLabels = (enums: EnumsObject): {} => {
  const parsedEnums: ReverseEnumsObject = {};
  Object.entries(enums).forEach(([enumKey, enumValues]) => {
    const parsedSingleEnum: ReverseEnum = {};

    enumValues?.forEach(({ Name, ID }) => {
      parsedSingleEnum[Name] = ID;
    });

    parsedEnums[enumKey] = parsedSingleEnum;
  });

  return parsedEnums;
};
