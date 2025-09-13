import { NextFunction, Request, Response } from "express";
import logger, { reqLogPrefix } from "@logger";
import { httpStatus } from "@data";

export const logRequest = (
  req: Request,
  _res: Response,
  next: NextFunction
): void => {
  logger.info(reqLogPrefix(req) + " Received");

  next();
};

export const parseEnvFromCookies = (
  req: Request,
  res: Response,
  next: NextFunction
): Response<any, Record<string, any>> | void => {
  res.locals.envId =
    req.cookies?.workEnvironment &&
    JSON.parse(req.cookies?.workEnvironment)?.id;

  if (!res.locals.envId) {
    logger.warn("No environment ID received");
    return res
      .status(httpStatus.BAD_REQUEST)
      .send("No environment ID received");
  }

  next();
};
