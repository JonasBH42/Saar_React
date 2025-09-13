import { NextFunction, Request, Response } from "express";
import logger from "@logger";
import { workEnvsNoEnvi } from "./noEnviData";

export const findNoEnvi = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    res.send(workEnvsNoEnvi);
    logger.debug("get fake environments was successful");
  } catch (error) {
    next(error);
  }
};
