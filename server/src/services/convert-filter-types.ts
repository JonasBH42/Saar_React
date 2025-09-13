import {
  Between,
  LessThan,
  LessThanOrEqual,
  MoreThan,
  MoreThanOrEqual,
  Not,
  Raw,
} from "typeorm";
import { isString } from "class-validator";
import logger from "@logger";
const ONE_MINUTE = 59999;

const splitAlias = (alias: string) => {
  const pathArray = alias.split(".");

  return `"${pathArray[0]}"."${pathArray[1]}"`;
};

export function convertFilter(
  field: string,
  operator: string,
  value?: string | string[],
  id?: number
) {
  switch (operator) {
    case "isEmpty":
      return {
        [field]: Raw(
          (alias) =>
            `${splitAlias(alias)} IS NULL OR  
							 (pg_typeof(${splitAlias(
                 alias
               )}) = 'character varying'::regtype AND cast(${splitAlias(
              alias
            )} as text) = '')`
        ),
      };

    case "isNotEmpty":
      return {
        [field]: Not(
          Raw(
            (alias) => `${splitAlias(alias)} IS NULL OR  
							 (pg_typeof(${splitAlias(
                 alias
               )}) = 'character varying'::regtype AND cast(${splitAlias(
              alias
            )} as text) = '')`
          )
        ),
      };

    case "contains":
      return value && id
        ? {
            [field]: Raw((alias) => `${splitAlias(alias)}::text LIKE :${id}`, {
              [id]: `%${value.toString()}%`,
            }),
          }
        : null;

    case "equals":
      return value && id
        ? {
            [field]: Raw((alias) => `${splitAlias(alias)}::text = :${id}`, {
              [id]: value.toString(),
            }),
          }
        : null;

    case "startsWith":
      return value && id
        ? {
            [field]: Raw((alias) => `${splitAlias(alias)}::text LIKE :${id}`, {
              [id]: `${value.toString()}%`,
            }),
          }
        : null;
    case "endsWith":
      return value && id
        ? {
            [field]: Raw((alias) => `${splitAlias(alias)}::text LIKE :${id}`, {
              [id]: `%${value.toString()}`,
            }),
          }
        : null;

    case "=":
      return value && !isNaN(Number(value)) ? { [field]: Number(value) } : null;

    case "!=":
      return value && !isNaN(Number(value))
        ? { [field]: Not(Number(value)) }
        : null;

    case ">":
      return value && !isNaN(Number(value))
        ? { [field]: MoreThan(Number(value)) }
        : null;

    case "<":
      return value && !isNaN(Number(value))
        ? { [field]: LessThan(Number(value)) }
        : null;

    case "<=":
      return value && !isNaN(Number(value))
        ? { [field]: LessThanOrEqual(Number(value)) }
        : null;

    case ">=":
      return value && !isNaN(Number(value))
        ? { [field]: MoreThanOrEqual(Number(value)) }
        : null;

    case "is":
      return value
        ? isString(value) && !isNaN(new Date(value).getTime())
          ? {
              [field]: Between(
                new Date(value),
                new Date(new Date(value).getTime() + ONE_MINUTE)
              ),
            }
          : value === "true"
          ? {
              [field]: Raw(
                (alias) =>
                  `CASE WHEN pg_typeof(${splitAlias(
                    alias
                  )}) = 'boolean'::regtype THEN ${splitAlias(
                    alias
                  )}::text = 'true' ELSE ${splitAlias(alias)} IS NOT NULL END`
              ),
            }
          : {
              [field]: Raw(
                (alias) =>
                  `CASE WHEN pg_typeof(${splitAlias(
                    alias
                  )}) = 'boolean'::regtype THEN ${splitAlias(
                    alias
                  )}::text = 'false' ELSE ${splitAlias(alias)} IS NULL END`
              ),
            }
        : null;

    case "not":
      return value
        ? isString(value) && !isNaN(new Date(value).getTime())
          ? {
              [field]: Not(
                Between(
                  new Date(value),
                  new Date(new Date(value).getTime() + ONE_MINUTE)
                )
              ),
            }
          : { [field]: Not(value) }
        : null;

    case "after":
      return isString(value) && value.length
        ? {
            [field]: MoreThan(new Date(new Date(value).getTime() + ONE_MINUTE)),
          }
        : null;

    case "onOrAfter":
      return isString(value) && value.length
        ? { [field]: MoreThanOrEqual(new Date(value)) }
        : null;

    case "before":
      return isString(value) && value.length
        ? { [field]: LessThan(new Date(value)) }
        : null;

    case "onOrBefore":
      return isString(value) && value.length
        ? {
            [field]: LessThanOrEqual(
              new Date(new Date(value).getTime() + ONE_MINUTE)
            ),
          }
        : null;

    case "isAnyOf":
      return id && value?.length && Array.isArray(value)
        ? {
            [field]: Raw(
              (alias) => `${splitAlias(alias)}::text IN (:...${id})`,
              {
                [id]: value,
              }
            ),
          }
        : null;

    default:
      logger.warn(`we still don't support the operator ${operator}`);
      return null;
  }
}
