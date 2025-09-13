import dotenv from "dotenv";
import { logOptions, nodeEnv, ormConfig } from "@types";

dotenv.config();

export const NODE_ENV: nodeEnv = (process.env.NODE_ENV ??
  "development") as nodeEnv;

export const PORT: number = parseInt(process.env.PORT ?? "2121");

export const SIMULATOR_API_URLS: string[] = JSON.parse(
  process.env.SIMULATOR_API_URLS ??
    `["https://app-ext-saar-dev.azurewebsites.net",
  "https://app-ext-saar-test.azurewebsites.net",
  "http://localhost:${PORT}",
  "http://localhost:3000"]`
);

export const ENVI_API_URL: string =
  process.env.ENVI_API_URL ?? "https://app-ext-envi-dev.azurewebsites.net/api";

export const REFUA_API_URL: string =
  process.env.REFUA_API_URL ??
  "https://app-ext-refual-dev.azurewebsites.net/api/";

export const SIRENS_SERVICE_API_URL: string =
  process.env.SIRENS_SERVICE_API_URL ??
  "https://app-ext-sirensservice-dev.azurewebsites.net/";

export const REQUEST_WEIGHT_LIMIT: string =
  process.env.REQUEST_WEIGHT_LIMIT ?? "5mb";

export const BULK_INSERT_AMOUNT: number = parseInt(
  process.env.BULK_INSERT_AMOUNT ?? "1000"
);

export const MAX_STRING_LENGTH: number = parseInt(
  process.env.MAX_STRING_LENGTH ?? "65535"
);

export const CLIENT_BUILD_FOLDER: string =
  process.env.CLIENT_BUILD_FOLDER ?? "public";

export const DEFAULT_EVENT_CALENDER: string =
  process.env.DEFAULT_EVENT_CALENDER ?? "1";

export const LOG_OPTIONS: logOptions = Object.freeze({
  filename: process.env.logFilename ?? "C:/Logs/Saar/Saar.log",
  errorsFileName:
    process.env.errorsLogFilename ?? "C:/Logs/Saar/SaarErrors.log",
  level: process.env.logLevel ?? "debug",
  maxsize: parseInt(process.env.maxsize ?? "1000000"),
  maxFiles: parseInt(process.env.maxFiles ?? "50"),
  toFile: !!(process.env.logToFile ?? false),
});

export const ORM_CONFIG: ormConfig = Object.freeze({
  username: process.env.DB_USERNAME ?? "Shaldag@postgre-ext-saar-dev",
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME ?? "saar",
  schema: process.env.DB_SCHEMA ?? "public",
  host:
    process.env.DB_HOST ?? "postgre-ext-saar-dev.postgres.database.azure.com",
  type: "postgres",
  synchronize: !!(process.env.DB_SYNCHRONIZE ?? false),
  ssl: !!(process.env.DB_SSL ?? false),
});

export const CLIENT_CONFIG = Object.freeze({
  warClock: process.env.WARTIME ?? "05/08/2022 08:00",
  bulkF5ChunkSize: parseInt(process.env.BULK_CHUNK_SIZE ?? "10"),
});
