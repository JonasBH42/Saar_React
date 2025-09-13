import { NextFunction, Request, Response } from "express";
import { ValidationError } from "class-validator";
import logger, { errorsStackLogger, reqLogPrefix } from "@logger";
import { httpStatus } from "@data";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  _next: NextFunction
): void => {
  if (err instanceof SyntaxError) {
    logger.warn(`${reqLogPrefix(req)} Request failed: ${err.toString()}`);

    res.status(httpStatus.BAD_REQUEST).json("Bad syntax");
  } else if (err instanceof ValidationError) {
    logger.warn(`${reqLogPrefix(req)} Request failed: ${err.toString()}`);

    res.status(httpStatus.BAD_REQUEST).json(err);
  } else {
    logger.error(`${reqLogPrefix(req)} Request failed: ${err.message}`);
    errorsStackLogger.error(err);

    res.status(httpStatus.INTERNAL_SERVER_ERROR).send("Error occurred");
  }
};
