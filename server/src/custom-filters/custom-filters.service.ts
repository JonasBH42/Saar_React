import { isUUID, validate } from "class-validator";
import ORM from "@ORM";
import { ORM_CONFIG } from "@environment";
import CustomFilter from "./custom-filters.entity";

const FilterRepo = ORM.getRepository(CustomFilter);

export const getHighestFilterId = async (): Promise<number> => {
  const data = await ORM.query(
    `SELECT MAX("filterId") FROM ${ORM_CONFIG.schema}.${FilterRepo.metadata.tableName}`
  );

  return data?.[0]?.max ?? 0;
};

export const insertFilters = async (
  items: CustomFilter[]
): Promise<CustomFilter[]> => {
  try {
    const parsedFilters: CustomFilter[] = [];

    const newFilterId = (await getHighestFilterId()) + 1;

    for (const obj of items) {
      obj.filterId = newFilterId;
      parsedFilters.push({
        ...obj,
      });
    }

    for (const filter of parsedFilters) {
      const errors = await validate(filter);
      if (errors.length) throw errors[0];
    }

    await FilterRepo.insert(parsedFilters);

    return parsedFilters;
  } catch (error) {
    throw error;
  }
};

export const deleteFilters = async (uids: string[]): Promise<number> => {
  try {
    const validUids = uids.filter((u) => isUUID(u));
    if (!validUids.length) return 0;

    const { affected = 0 } = await FilterRepo.softDelete(validUids);

    return affected;
  } catch (error) {
    throw error;
  }
};
