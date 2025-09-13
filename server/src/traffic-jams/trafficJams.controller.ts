import { NextFunction, Request, Response } from "express";
import { validate } from "class-validator";
import { plainToInstance } from "class-transformer";
import logger from "@logger";
import ORM from "@ORM";
import { TrafficJam } from "./trafficJam.entity";

const TrafficJamRepo = ORM.getRepository(TrafficJam);

export const findTrafficJams = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  const envId: number = res.locals.envId;

  try {
    const data = await TrafficJamRepo.find({
      where: { workEnvironmentId: envId },
    });

    res.json(data);
    logger.debug("get all was successful");
  } catch (error) {
    next(error);
  }
};

export const insertTrafficJam = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { body } = req;
  const envId: number = res.locals.envId;

  try {
    const jam = plainToInstance(TrafficJam, {
      ...body,
      workEnvironmentId: envId,
      createdAt: undefined,
      updatedAt: undefined,
      deletedAt: undefined,
    });

    const errors = await validate(jam);
    if (errors.length > 0) throw errors[0];

    const data = await TrafficJamRepo.save(jam);

    res.json(data);
    logger.debug("successfully inserted traffic jam");
  } catch (error) {
    next(error);
  }
};
