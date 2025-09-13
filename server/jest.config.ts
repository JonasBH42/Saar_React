import type { Config } from "@jest/types";

export default async (): Promise<Config.InitialOptions> => ({
  verbose: true,
  preset: "ts-jest",
  testEnvironment: "node",
  transform: {
    "^.+\\.ts?$": "ts-jest",
  },
  moduleNameMapper: {
    "@environment": "<rootDir>/src/environment",
    "@middlewares": "<rootDir>/src/middlewares",
    "@router": "<rootDir>/src/router",
    "@services": "<rootDir>/src/services",
    "@logger": "<rootDir>/src/logger",
    "@ORM": "<rootDir>/src/ORM",
    "@data": "<rootDir>/src/data",
    "@types": "<rootDir>/src/types",
  },
});
