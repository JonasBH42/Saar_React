import ORM from "@ORM";
import { ORM_CONFIG } from "@environment";

export const district = (latitude: number, longitude: number) =>
  ORM.query(
    `SELECT name as district FROM ${ORM_CONFIG.schema}.districts WHERE
        ST_COVERS(shape, ST_GeogFromText(CONCAT('SRID=4326;POINT(', CAST($1 AS FLOAT) , ' ', CAST($2 AS FLOAT), ')')))`,
    [longitude, latitude]
  );

export const subDistrict = (latitude: number, longitude: number) =>
  ORM.query(
    `SELECT name as subdistrict FROM ${ORM_CONFIG.schema}.subdistricts WHERE
        ST_COVERS(shape, ST_GeogFromText(CONCAT('SRID=4326;POINT(', CAST($1 AS FLOAT) , ' ', CAST($2 AS FLOAT), ')')))`,
    [longitude, latitude]
  );

export const city = (latitude: number, longitude: number) =>
  ORM.query(
    `SELECT name as city FROM ${ORM_CONFIG.schema}.cities WHERE
        ST_COVERS(shape, ST_GeogFromText(CONCAT('SRID=4326;POINT(', CAST($1 AS FLOAT) , ' ', CAST($2 AS FLOAT), ')')))`,
    [longitude, latitude]
  );
