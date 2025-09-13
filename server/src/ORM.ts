import { DataSource } from "typeorm";
import logger from "./logger";
import { ORM_CONFIG } from "./environment";

export const ORM = new DataSource({
  ...ORM_CONFIG,
  entities: [__dirname + "/**/*.{entity,enums}{.ts,.js}"],
});

export const initializeORM = async (): Promise<void> => {
  try {
    await ORM.initialize();

    logger.info("DB has been initialized!");
  } catch (error) {
    logger.error("Error during DB initialization: ");
    console.error(error);
  }
};

export default ORM;
