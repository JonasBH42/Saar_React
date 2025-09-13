import { In, Repository } from "typeorm";
import { plainToInstance } from "class-transformer";
import { convertFilter } from "@services/convert-filter-types";
import ORM from "@ORM";
import CustomFilter from "../custom-filters/custom-filters.entity";
import RelatedSiren from "../sirens/relatedSirens.entity";

const enumUnchangeOperator = ["isEmpty", "isNotEmpty"];

const relatedSirensRepo: Repository<RelatedSiren> =
  ORM.getRepository(RelatedSiren);

export const convertFilterItems = async (
  filter: any,
  enumList: string[],
  initialCondition: any
) => {
  const filters = plainToInstance(
    CustomFilter,
    Array.isArray(filter) ? filter.map((filter) => filter) : [filter]
  );

  const simpleFilters = filters
    .filter((filter) => !enumList.includes(filter.columnField))
    .reduce<CustomFilter[]>(
      (acc, { columnField, operatorValue, value, id }) => {
        const filterItem = convertFilter(columnField, operatorValue, value, id);

        return filterItem
          ? [
              ...acc,
              {
                ...filterItem,
                ...initialCondition,
              },
            ]
          : acc;
      },
      []
    );

  const rightEnumFilterItem = async (
    columnField: string,
    operatorValue: string,
    value?: string,
    id?: number
  ) =>
    columnField === "relatedSirens"
      ? {
          uid: In(
            (
              await relatedSirensRepo.find({
                select: { sirenEventId: true },
                where: {
                  ...convertFilter("name", operatorValue, value, id),
                },
              })
            ).map((val) => val.sirenEventId)
          ),
        }
      : !enumUnchangeOperator.includes(operatorValue)
      ? value
        ? {
            [columnField]: convertFilter("Name", operatorValue, value, id),
          }
        : {}
      : convertFilter(columnField, operatorValue);

  const enumFilters = await filters
    .filter((filter) => enumList.includes(filter.columnField))
    .reduce<Promise<CustomFilter[]>>(
      async (acc, { columnField, operatorValue, value, id }) => {
        const filterItem = await rightEnumFilterItem(
          columnField,
          operatorValue,
          value,
          id
        );

        return filterItem
          ? [
              ...(await acc),
              {
                ...filterItem,
                ...initialCondition,
              },
            ]
          : acc;
      },
      Promise.resolve([])
    );

  return [...enumFilters, ...simpleFilters].length
    ? [...enumFilters, ...simpleFilters]
    : [{ ...initialCondition }];
};
