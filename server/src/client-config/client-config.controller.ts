import { NextFunction, Request, Response } from "express";
import { CLIENT_CONFIG } from "@environment";
import logger from "@logger";

export const getClientConfig = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    res.json(CLIENT_CONFIG);
    logger.debug("get client-config request was successful");
  } catch (error) {
    next(error);
  }
};
