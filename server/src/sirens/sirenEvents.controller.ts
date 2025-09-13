import { NextFunction, Request, Response } from "express";
import {
  IsNull,
  LessThanOrEqual,
  Repository,
  SelectQueryBuilder,
} from "typeorm";
import { isUUID, validate, ValidationError } from "class-validator";
import { plainToInstance } from "class-transformer";
import _ from "lodash";
import ORM from "@ORM";
import logger from "@logger";
import { httpStatus, types } from "@data";
import { customQuery } from "@services/get-custom-query";
import SirenEvent from "./sirenEvents.entity";
import {
  deleteSirenEvents,
  insertSirensEventData,
} from "./sirenEvents.service";
import RelatedSiren from "./relatedSirens.entity";
import { enumList } from "../enums/enums.config";

const sirensEventsRepo: Repository<SirenEvent> = ORM.getRepository(SirenEvent);
const relatedSirensRepo: Repository<RelatedSiren> =
  ORM.getRepository(RelatedSiren);
const TYPE = types.SIRENS;

export const findSirenEvents = async (
  req: Request<{}, {}, {}, { filters: any; pageOption: string; order: string }>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { envId } = res.locals;
  const { order, filters, pageOption } = req.query;

  try {
    const query: SelectQueryBuilder<SirenEvent> = await customQuery(
      sirensEventsRepo,
      filters,
      [...enumList(TYPE), "relatedSirens"],
      { workEnvironmentId: envId },
      TYPE,
      pageOption,
      order
    );

    if (req.query.pageOption) {
      const data = await query.getManyAndCount();
      res.json([
        data[0].map((sirenEvent) => ({
          ...sirenEvent,
          relatedSirens:
            sirenEvent.relatedSirens?.map(({ mdlc, name }) => ({
              mdlc,
              name,
            })) ?? [],
        })),
        data[1],
      ]);
    } else {
      const data = await query.getMany();

      res.json(
        data.map((sirenEvent) => ({
          ...sirenEvent,
          relatedSirens:
            sirenEvent.relatedSirens?.map(({ mdlc, name }) => ({
              mdlc,
              name,
            })) ?? [],
        }))
      );
    }

    logger.debug("get all was successful");
  } catch (error) {
    next(error);
  }
};

export const findSirenEventsTimedToThisMinute = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await sirensEventsRepo.find({
      where: {
        sendTimeScheduledAt: LessThanOrEqual(new Date()),
        acceptedByDestinationAt: IsNull(),
      },
      relations: {
        relatedSirens: true,
      },
      order: {
        workEnvironmentId: "ASC",
      },
    });

    res.json(data);
    logger.debug("got sirens events timed to this minute successfully");
  } catch (error) {
    next(error);
  }
};

export const insertSirenEvent = async (
  req: Request<{}, {}, SirenEvent>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { body } = req;
  const { envId } = res.locals;

  try {
    await insertSirensEventData(
      sirensEventsRepo,
      {
        ...body,
        workEnvironmentId: envId,
        createdAt: undefined,
        updatedAt: undefined,
        deletedAt: undefined,
      },
      res
    );

    res.sendStatus(httpStatus.OK);
    logger.debug(`successfully inserted sirens event`);
  } catch (error) {
    next(error);
  }
};

export const updateSirenEventByUid = async (
  req: Request<{}, {}, SirenEvent>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { body } = req;
  const envId: number = res.locals.envId;

  try {
    const sirenEvent = plainToInstance(SirenEvent, {
      ...body,
      workEnvironmentId: envId,
    });

    const errors = await validate(
      { ...sirenEvent, relatedSirens: undefined },
      { skipMissingProperties: true }
    );
    if (errors.length > 0) throw errors[0];

    const relatedSirens: RelatedSiren[] = sirenEvent.relatedSirens.map(
      ({ mdlc, name }) => ({
        mdlc,
        name,
        sirenEventId: sirenEvent.uid,
      })
    );

    const affected = await (
      await sirensEventsRepo.update(
        {
          uid: sirenEvent.uid,
          acceptedByDestinationAt: IsNull(),
          workEnvironmentId: envId,
        },
        {
          name: sirenEvent.name,
          sendTimeScheduledAt: sirenEvent.sendTimeScheduledAt,
          status: sirenEvent.status,
        }
      )
    ).affected;

    if (!affected) {
      res.status(httpStatus.NOT_FOUND).json(affected);
      logger.debug(`siren event record with uid ${body.uid} not found`);
    } else {
      await relatedSirensRepo.delete({
        sirenEventId: sirenEvent.uid,
      });

      await relatedSirensRepo.insert(relatedSirens);

      res.status(httpStatus.OK).json(affected);
      logger.debug(
        `siren event record with uid ${body.uid} updated successfully`
      );
    }
  } catch (error) {
    next(error);
  }
};

export const updateSirenEventsAcceptedByDestination = async (
  req: Request<{}, {}, SirenEvent>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const {
    body: { uid, acceptedByDestinationAt },
  } = req;

  try {
    if (!isUUID(uid)) throw new ValidationError();

    const { affected = 0 } = await sirensEventsRepo.update(
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

export const deleteSirenEventByUid = async (
  req: Request<{ uid: string }>,
  res: Response,
  next: NextFunction
) => {
  const {
    params: { uid },
  } = req;

  try {
    const affected = await deleteSirenEvents([uid]);

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

export const bulkDeleteSirenEvents = async (
  req: Request<{}, {}, { uids: string[] }>,
  res: Response,
  next: NextFunction
) => {
  const { body } = req;

  try {
    const affected = await deleteSirenEvents(body.uids);

    res.json(affected);
    logger.debug(`successfully deleted ${affected} rows`);
  } catch (error) {
    next(error);
  }
};
