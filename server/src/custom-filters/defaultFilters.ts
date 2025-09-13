import logger, { errorsStackLogger } from "@logger";
import ORM from "@ORM";
import CustomFilter from "./custom-filters.entity";

const defaultFilters = [
  {
    filterId: 1,
    id: 1,
    name: "נשלחו ליעד",
    columnField: "isAcceptedByShual",
    operatorValue: "is",
    value: "true",
  },
  {
    filterId: 2,
    id: 2,
    name: "טרם נשלחו ליעד",
    columnField: "isAcceptedByShual",
    operatorValue: "is",
    value: "false",
  },
];

export const setupDefaultFilters = async () => {
  try {
    await ORM.createQueryBuilder()
      .insert()
      .into(CustomFilter)
      .values(defaultFilters)
      .orIgnore()
      .execute();
  } catch (error) {
    logger.error("Error initializing default filters...");
    errorsStackLogger.error(error);
  }
};
