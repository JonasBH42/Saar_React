import { NextFunction, Request, Response } from "express";
import { In, IsNull, LessThanOrEqual, SelectQueryBuilder } from "typeorm";
import { isUUID, validate, ValidationError } from "class-validator";
import { plainToInstance } from "class-transformer";
import logger from "@logger";
import ORM from "@ORM";
import { httpStatus, types } from "@data";
import { customQuery } from "@services/get-custom-query";
import Force from "./forces.entity";
import { deleteForces } from "./forces.service";
import { enumList } from "../enums/enums.config";

const ForceRepo = ORM.getRepository(Force);
const TYPE = types.FORCES;

export const findForces = async (
  req: Request<{}, {}, {}, { filters: any; pageOption: string; order: string }>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { envId } = res.locals;
  const { order, filters, pageOption } = req.query;

  try {
    const query: SelectQueryBuilder<Force> = await customQuery(
      ForceRepo,
      filters,
      enumList(TYPE),
      { workEnvironmentId: envId },
      TYPE,
      pageOption,
      order
    );

    const data = await (req.query.pageOption
      ? query.getManyAndCount()
      : query.getMany());

    res.json(data);
    logger.debug("get all was successful");
  } catch (error) {
    next(error);
  }
};

export const findForcesTimedToThisMinute = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await ForceRepo.find({
      where: {
        sendTimeScheduledAt: LessThanOrEqual(new Date()),
        acceptedByDestinationAt: IsNull(),
      },
      order: {
        workEnvironmentId: "ASC",
      },
    });

    res.json(data);
    logger.debug("got forces timed to this minute successfully");
  } catch (error) {
    next(error);
  }
};

export const upsertForce = async (
  req: Request<{}, {}, Force>,
  res: Response,
  next: NextFunction
) => {
  const { body } = req;
  const { envId } = res.locals;

  try {
    const force = plainToInstance(Force, {
      ...body,
      workEnvironmentId: envId,
      acceptedByDestinationAt: undefined,
      createdAt: undefined,
      updatedAt: undefined,
      deletedAt: undefined,
    });

    const errors = await validate(force);
    if (errors.length > 0) throw errors[0];

    const { raw } = await ForceRepo.upsert(force, {
      conflictPaths: ["uid"],
      skipUpdateIfNoValuesChanged: true,
    });

    res.json(raw);
    logger.debug("successfully upserted row");
  } catch (error) {
    next(error);
  }
};

export const updateForceAcceptedByDestination = async (
  req: Request<{}, {}, Force>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const {
    body: { uid, acceptedByDestinationAt },
  } = req;

  try {
    if (!isUUID(uid)) throw new ValidationError();

    const { affected = 0 } = await ForceRepo.update(
      { uid, acceptedByDestinationAt: IsNull() },
      { acceptedByDestinationAt }
    );

    if (!affected) {
      res.status(httpStatus.NOT_FOUND).json(affected);
      logger.debug(`Record with uid ${uid} not found`);
    } else {
      res.status(httpStatus.OK).json(affected);
      logger.debug(`Record with uid ${uid} updated successfully`);
    }
  } catch (error) {
    next(error);
  }
};

export const multipleUpdateForces = async (
  req: Request<
    {},
    {},
    { uids: string[]; fields: { [key in keyof Force]?: any } }
  >,
  res: Response,
  next: NextFunction
) => {
  const {
    body: { uids, fields },
  } = req;
  const { envId } = res.locals;

  try {
    const force = plainToInstance(Force, fields);

    const errors = await validate(force, { skipMissingProperties: true });
    if (errors.length > 0) throw errors[0];

    const { affected = 0 } = await ForceRepo.update(
      {
        uid: In(uids.filter((u) => isUUID(u))),
        acceptedByDestinationAt: IsNull(),
        workEnvironmentId: envId,
      },
      {
        ...force,
        uid: undefined,
        acceptedByDestinationAt: undefined,
      }
    );

    res.json(affected);
    logger.debug(`successfully updated ${affected} rows`);
  } catch (error) {
    next(error);
  }
};

export const deleteForceByUid = async (
  req: Request<{ uid: string }>,
  res: Response,
  next: NextFunction
) => {
  const {
    params: { uid },
  } = req;

  try {
    const affected = await deleteForces([uid]);

    if (!affected) {
      res.status(httpStatus.NOT_FOUND).json(affected);
      logger.debug(`Record with uid ${uid} not found`);
    } else {
      res.status(httpStatus.OK).json(affected);
      logger.debug(`Record with uid ${uid} deleted successfully`);
    }
  } catch (error) {
    next(error);
  }
};

export const bulkDeleteForces = async (
  req: Request<{}, {}, { uids: string[] }>,
  res: Response,
  next: NextFunction
) => {
  const { body } = req;

  try {
    const affected = await deleteForces(body.uids);

    res.json(affected);
    logger.debug(`successfully deleted ${affected} rows`);
  } catch (error) {
    next(error);
  }
};
