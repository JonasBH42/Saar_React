import { In, IsNull, LessThanOrEqual, SelectQueryBuilder } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { isUUID, validate, ValidationError } from "class-validator";
import { plainToInstance } from "class-transformer";
import moment from "moment";
import { httpStatus, types } from "@data";
import logger from "@logger";
import ORM from "@ORM";
import { Enum } from "@types";
import { customQuery, enumsObjsByLabels } from "@services";
import * as enumEntities from "./events.enums";
import { deleteEvents, insertEvents } from "./events.service";
import Event from "./events.entity";
import { enumList } from "../enums/enums.config";

const EventRepo = ORM.getRepository(Event);
const TYPE = types.EVENTS;

export const findEvents = async (
  req: Request<{}, {}, {}, { filters: any; pageOption: string; order: string }>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { envId } = res.locals;
  const { order, filters, pageOption } = req.query;

  try {
    const query: SelectQueryBuilder<Event> = await customQuery(
      EventRepo,
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

export const insertEvent = async (
  req: Request<{ chunkNumber: string }, {}, Event | Event[]>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { body } = req;
  const { envId } = res.locals;

  try {
    const bodyWithEnv = Array.isArray(body)
      ? body.map((event) => ({ ...event, workEnvironmentId: envId }))
      : [{ ...body, workEnvironmentId: envId }];

    const events = plainToInstance(Event, bodyWithEnv);

    for (const ev of events) {
      const errors = await validate(ev);
      if (errors.length) throw errors[0];
    }

    const data = req.params.chunkNumber
      ? await insertEvents(events, envId, parseInt(req.params.chunkNumber))
      : await insertEvents(events, envId);

    if (!data.length) {
      res.status(httpStatus.BAD_REQUEST).json(data);
      logger.debug("The array was empty. No records were inserted");
    } else {
      res.status(httpStatus.OK).json(data);
      logger.debug(`succesfully inserted ${data.length} records`);
    }
  } catch (error) {
    next(error);
  }
};

export const updateEventByUid = async (
  req: Request<{}, {}, Event>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { body } = req;
  const { envId } = res.locals;

  try {
    const event = plainToInstance(Event, {
      ...body,
      workEnvironmentId: envId,
    });

    const errors = await validate(event, { skipMissingProperties: true });
    if (errors.length > 0) throw errors[0];

    const eventBeforeUpdate = await EventRepo.findOneBy({
      uid: body.uid,
    });

    const timeDiff = moment(new Date(body.sendTimeScheduledAt)).diff(
      eventBeforeUpdate?.sendTimeScheduledAt
    );

    const { affected = 0 } = await EventRepo.update(
      {
        uid: event.uid,
        acceptedByDestinationAt: IsNull(),
        workEnvironmentId: envId,
      },
      {
        ...event,
        shualId: undefined,
        acceptedByDestinationAt: undefined,
      }
    );

    if (!isNaN(timeDiff) && timeDiff !== 0) {
      await EventRepo.createQueryBuilder()
        .update()
        .set({
          sendTimeScheduledAt: () =>
            `"sendTimeScheduledAt" + INTERVAL '${timeDiff} milliseconds'`,
        })
        .where(
          `workEnvironmentId = :envId AND acceptedByDestinationAt IS NULL AND deletedAt IS NULL AND
           sendTimeScheduledAt >= :sendTimeScheduledAt AND simulatorId = :simulatorId AND uid != :uid`,
          {
            envId,
            sendTimeScheduledAt: moment(
              eventBeforeUpdate?.sendTimeScheduledAt
            ).format("YYYY-MM-DD HH:mm:ss"),
            simulatorId: event.simulatorId,
            uid: event.uid,
          }
        )
        .execute();
    }

    if (!affected) {
      res.status(httpStatus.NOT_FOUND).json(affected);
      logger.debug(`Record with uid ${body.uid} not found`);
    } else {
      res.status(httpStatus.OK).json(affected);
      logger.debug(`Record with uid ${body.uid} updated successfully`);
    }
  } catch (error) {
    next(error);
  }
};

export const multipleUpdateEvents = async (
  req: Request<
    {},
    {},
    { uids: string[]; fields: { [key in keyof Event]?: any } }
  >,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const {
    body: { uids, fields },
  } = req;
  const { envId } = res.locals;

  try {
    const event = plainToInstance(Event, fields);

    const errors = await validate(event, { skipMissingProperties: true });
    if (errors.length > 0) throw errors[0];

    const { affected = 0 } = await EventRepo.update(
      {
        uid: In(uids.filter((u) => isUUID(u))),
        acceptedByDestinationAt: IsNull(),
        workEnvironmentId: envId,
      },
      {
        ...event,
        uid: undefined,
        acceptedByDestinationAt: undefined,
        shualId: undefined,
      }
    );

    res.json(affected);
    logger.debug(`successfully updated ${affected} rows`);
  } catch (error) {
    next(error);
  }
};

export const deleteEventByUid = async (
  req: Request<{ uid: string }>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const {
    params: { uid },
  } = req;

  try {
    const affected = await deleteEvents([uid]);

    if (!affected) {
      res.status(httpStatus.NOT_FOUND).json(affected);
      logger.debug(`Record with uid ${uid} not found`);
    } else {
      res.status(httpStatus.OK).json({ answer: `deleted row with uid ${uid}` });
      logger.debug(`Record with uid ${uid} deleted successfully`);
    }
  } catch (error) {
    next(error);
  }
};

export const bulkDeleteEvents = async (
  req: Request<{}, {}, { uids: string[] }>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { body } = req;

  try {
    const affected = await deleteEvents(body.uids);

    res.json(affected);
    logger.debug(`successfully deleted ${affected} rows`);
  } catch (error) {
    next(error);
  }
};

export const getMultipleEventsEnums = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const enumsData: { [key in string]: Enum[] } = {};

  try {
    for (const entity of Object.values(enumEntities)) {
      if (entity) {
        enumsData[entity.key] = await ORM.getRepository(entity).find();
      }
    }

    res.json(enumsObjsByLabels(enumsData));
    logger.debug(`get multiple enums was successful`);
  } catch (error) {
    next(error);
  }
};

export const findEventsTimedToThisMinute = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const data = await EventRepo.find({
      where: {
        sendTimeScheduledAt: LessThanOrEqual(new Date()),
        acceptedByDestinationAt: IsNull(),
        isDisabled: false,
      },
      order: {
        workEnvironmentId: "ASC",
      },
    });

    res.json(data);
    logger.debug("got events timed to this minute successfully");
  } catch (error) {
    next(error);
  }
};

export const updateEventAcceptedByDestination = async (
  req: Request<{}, {}, Event>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const {
    body: { uid, acceptedByDestinationAt },
  } = req;

  try {
    if (!isUUID(uid)) throw new ValidationError();

    const { affected = 0 } = await EventRepo.update(
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

export const updateShualIdBySimulatorId = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const {
    body: { simulatorId, shualId },
  } = req;

  try {
    const { affected = 0 } = await EventRepo.update(
      { simulatorId },
      { shualId }
    );

    if (!affected) {
      res.status(httpStatus.NOT_FOUND).json(affected);
      logger.debug(`Record with simId ${simulatorId} not found`);
    } else {
      res.status(httpStatus.OK).json(affected);
      logger.debug(
        `Record with simId ${simulatorId} accepted by destination successfully`
      );
    }
  } catch (error) {
    next(error);
  }
};

export const getEventsForReplication = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const data = await EventRepo.find();
    res.json(data);
    logger.debug("get all was successful");
  } catch (error) {
    next(error);
  }
};
