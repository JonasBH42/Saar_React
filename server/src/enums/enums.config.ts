import logger, { errorsStackLogger } from "@logger";
import ORM from "@ORM";
import { Enum } from "@types";
import * as eventEnums from "../events/events.enums";
import * as forceEnums from "../forces/forces.enums";
import * as sirensEnums from "../sirens/sirens.enums";
import * as barragesEnums from "../barrages/barrages.enums";

export const enumEntities: {
  [key in string]: { [key in string]: typeof Enum };
} = {};

[
  ["events", eventEnums],
  ["forces", forceEnums],
  ["sirens", sirensEnums],
  ["barrages", barragesEnums],
].forEach(([type, enums]) => {
  Object.values(enums).forEach((Enum) => {
    enumEntities[type as string] = {
      ...enumEntities[type as string],
      [Enum.key.toLowerCase()]: Enum,
    };
  });
});

export const enumList = (key: string) =>
  Object.values(enumEntities[key]).map((value) => value.key);

export const setupEnums = async () => {
  try {
    for (const entities of Object.values(enumEntities)) {
      for (const entity of Object.values(entities)) {
        await ORM.createQueryBuilder()
          .insert()
          .into(entity)
          .values(entity.data)
          .orIgnore()
          .execute();
      }
    }
  } catch (error) {
    logger.error("Error initializing enums...");
    errorsStackLogger.error(error);
  }
};
