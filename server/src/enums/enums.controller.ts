import { NextFunction, Request, Response } from "express";
import logger from "@logger";
import ORM from "@ORM";
import { httpStatus } from "@data";
import { enumEntities } from "./enums.config";

export const getEnums = async (
  req: Request<{ type: string; key: string }>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const {
    params: { type, key },
  } = req;

  try {
    const enumEntity = enumEntities[type.toLowerCase()][key.toLowerCase()];
    const data = enumEntity && (await ORM.getRepository(enumEntity).find());

    if (!data) {
      res.status(httpStatus.NOT_FOUND).json();
      logger.debug(`enum ${key} not found`);
    } else {
      res.json(data);
      logger.debug(`get all ${key} enums was successful`);
    }
  } catch (error) {
    next(error);
  }
};
