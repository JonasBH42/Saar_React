import { NextFunction, Request, Response } from "express";
import { plainToInstance } from "class-transformer";
import {
  In,
  IsNull,
  LessThanOrEqual,
  Repository,
  SelectQueryBuilder,
} from "typeorm";
import { isUUID, validate, ValidationError } from "class-validator";
import ORM from "@ORM";
import logger from "@logger";
import { httpStatus, types } from "@data";
import { Enum } from "@types";
import { customQuery, enumsObjsByLabels } from "@services";
import { deleteBarrage, insertBarrages } from "./barrages.service";
import * as enumEntities from "./barrages.enums";
import { enumList } from "../enums/enums.config";
import Barrage from "./barrages.entity";

const barragesRepo: Repository<Barrage> = ORM.getRepository(Barrage);
const TYPE = types.BARRAGES;

export const findBarrages = async (
  req: Request<
    {},
    {},
    {},
    { filters: string; pageOption: string; order: string }
  >,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const envId: number = res.locals.envId;
  const { order, filters, pageOption } = req.query;

  try {
    const query: SelectQueryBuilder<Barrage> = await customQuery(
      barragesRepo,
      filters,
      enumList(TYPE),
      {
        workEnvironmentId: envId,
      },
      TYPE,
      pageOption,
      order
    );

    const data = await (req.query.pageOption
      ? query.getManyAndCount()
      : query.getMany());

    res.send(data);
    logger.debug("get barrages was successful");
  } catch (error) {
    next(error);
  }
};

export const getMultipleBarragesEnums = async (
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

export const findBarragesTimedToThisMinute = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const data = await barragesRepo.find({
      where: {
        sendTimeScheduledAt: LessThanOrEqual(new Date()),
        acceptedByDestinationAt: IsNull(),
      },
      order: {
        workEnvironmentId: "ASC",
      },
    });

    res.send(data);
    logger.debug("got barrages timed to this minute successfully");
  } catch (error) {
    next(error);
  }
};

export const insertBarrage = async (
  req: Request<{ chunkNumber: string }, {}, Barrage | Barrage[]>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { body } = req;
  const { envId } = res.locals;

  try {
    const bodyWithEnv = Array.isArray(body)
      ? body.map((barrage) => ({ ...barrage, workEnvironmentId: envId }))
      : [{ ...body, workEnvironmentId: envId }];

    const barrages = plainToInstance(Barrage, bodyWithEnv);

    for (const barrage of barrages) {
      const errors = await validate(barrage);
      if (errors.length) throw errors[0];
    }

    const data = req.params.chunkNumber
      ? await insertBarrages(barrages, parseInt(req.params.chunkNumber))
      : await insertBarrages(barrages);

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

export const updateBarrageByUid = async (
  req: Request<{}, {}, Barrage>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { body } = req;
  const envId: number = res.locals.envId;
  try {
    const barrage = plainToInstance(Barrage, {
      ...body,
      workEnvironmentId: envId,
    });

    const errors = await validate(barrage, { skipMissingProperties: true });
    if (errors.length > 0) throw errors[0];

    const { affected = 0 } = await barragesRepo.update(
      {
        uid: barrage.uid,
        acceptedByDestinationAt: IsNull(),
        workEnvironmentId: envId,
      },
      {
        ...barrage,
        acceptedByDestinationAt: undefined,
      }
    );

    if (!affected) {
      res.status(httpStatus.NOT_FOUND).json(affected);
      logger.debug(`Barrage record with uid ${body.uid} not found`);
    } else {
      res.status(httpStatus.OK).json(affected);
      logger.debug(`Barrage record with uid ${body.uid} updated successfully`);
    }
  } catch (error) {
    next(error);
  }
};

export const updateBarrageAcceptedByDestination = async (
  req: Request<{}, {}, Barrage>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const {
    body: { uid, acceptedByDestinationAt },
  } = req;

  try {
    if (!isUUID(uid)) throw new ValidationError();

    const { affected = 0 } = await barragesRepo.update(
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

export const multipleUpdateBarrages = async (
  req: Request<
    {},
    {},
    { uids: string[]; fields: { [key in keyof Barrage]?: any } }
  >,
  res: Response,
  next: NextFunction
) => {
  const {
    body: { uids, fields },
  } = req;
  const envId: number = res.locals.envId;

  try {
    const barrage = plainToInstance(Barrage, fields);

    const errors = await validate(barrage, { skipMissingProperties: true });
    if (errors.length > 0) throw errors[0];

    const { affected = 0 } = await barragesRepo.update(
      {
        uid: In(uids.filter((u) => isUUID(u))),
        acceptedByDestinationAt: IsNull(),
        workEnvironmentId: envId,
      },
      {
        ...barrage,
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

export const deleteBarrageByUid = async (
  req: Request<{ uid: string }>,
  res: Response,
  next: NextFunction
) => {
  const {
    params: { uid },
  } = req;

  try {
    const affected = await deleteBarrage([uid]);

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

export const bulkDeleteBarrage = async (
  req: Request<{}, {}, { uids: string[] }>,
  res: Response,
  next: NextFunction
) => {
  const { body } = req;

  try {
    const affected = await deleteBarrage(body.uids);

    res.json(affected);
    logger.debug(`successfully deleted ${affected} rows`);
  } catch (error) {
    next(error);
  }
};
