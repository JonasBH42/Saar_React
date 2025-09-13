import { Repository } from "typeorm";
import { convertFilterItems } from "./convert-filters";

export async function customQuery(
  repo: Repository<any>,
  filters: string,
  enumList: string[],
  initialCondition: Object,
  TYPE: string,
  pageOption: string,
  order: string
) {
  const linkOperator = filters
    ? JSON.parse(filters)?.linkOperator ?? "and"
    : "";
  const convertedFilters = filters
    ? await convertFilterItems(
        JSON.parse(filters)?.items ?? [],
        enumList,
        initialCondition
      )
    : [];

  const query = repo.createQueryBuilder(TYPE).where(initialCondition);

  enumList.forEach((enumValue) => {
    query.leftJoinAndSelect(`${TYPE}.${enumValue}`, enumValue);
  });

  convertedFilters.forEach((filter) => {
    if (linkOperator == "or") {
      query.orWhere(filter);
    } else {
      query.andWhere(filter);
    }
  });

  if (pageOption) {
    const { rowsPerPage, page } = JSON.parse(pageOption);
    query.take(rowsPerPage).skip(page * rowsPerPage);
  }

  if (order) {
    const sort: { field: string; sort: string }[] = JSON.parse(order);
    (Array.isArray(sort) ? sort : [sort]).forEach(({ field, sort }) => {
      query.addOrderBy(
        field === "relatedSirens"
          ? `relatedSirens.name`
          : enumList.includes(field)
          ? `${field}.Name`
          : `${TYPE}.${field}`,
        sort === "asc" ? "ASC" : sort === "desc" ? "DESC" : undefined
      );
    });
  }

  return query;
}
