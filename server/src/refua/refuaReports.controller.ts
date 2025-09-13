import { NextFunction, Request, Response } from "express";
import {
  IsNull,
  LessThanOrEqual,
  Repository,
  SelectQueryBuilder,
} from "typeorm";
import { plainToInstance } from "class-transformer";
import { isUUID, validate, ValidationError } from "class-validator";
import ORM from "@ORM";
import logger from "@logger";
import { httpStatus, types } from "@data";
import { customQuery } from "@services/get-custom-query";
import RefuaReport from "./refuaReport.entity";
import { deleteReports, insertReportData } from "./refuaReport.service";
import { reportTableNames } from "./refuaRelations";
import EdSnapshot from "./edSnapshot.entity";
import CriticalBed from "./criticalBeds.entity";

const reportsRepo: Repository<RefuaReport> = ORM.getRepository(RefuaReport);
const edSnapshotsRepo: Repository<EdSnapshot> = ORM.getRepository(EdSnapshot);
const critBedsRepo: Repository<CriticalBed> = ORM.getRepository(CriticalBed);
const TYPE = types.REPORTS;

export const findReports = async (
  req: Request<
    { type: keyof typeof reportTableNames; uid: string },
    {},
    RefuaReport,
    { filters: any; pageOption: string; order: string }
  >,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const {
    params: { type, uid },
  } = req;
  const { order, filters, pageOption } = req.query;
  const { envId } = res.locals;
  const enumList = [reportTableNames[type]];

  try {
    const query: SelectQueryBuilder<RefuaReport> = await customQuery(
      reportsRepo,
      filters,
      enumList,
      {
        type: type,
        workEnvironmentId: envId,
        ...(uid ? { uid: uid } : {}),
      },
      TYPE,
      pageOption,
      order
    );

    const data = await (req.query.pageOption
      ? query.getManyAndCount()
      : query.getMany());

    res.json(data);
    logger.debug("get reports was successful");
  } catch (error) {
    next(error);
  }
};

export const findReportsTimedToThisMinute = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await reportsRepo.find({
      where: {
        sendTimeScheduledAt: LessThanOrEqual(new Date()),
        acceptedByDestinationAt: IsNull(),
      },
      relations: {
        criticalBedsData: true,
        edSnapshotsData: true,
      },
      order: {
        workEnvironmentId: "ASC",
      },
    });

    res.json(data);
    logger.debug("got reports timed to this minute successfully");
  } catch (error) {
    next(error);
  }
};

export const insertReport = async (
  req: Request<{}, {}, RefuaReport>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { body } = req;
  const { envId } = res.locals;

  try {
    await insertReportData(
      reportsRepo,
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
    logger.debug(`successfully inserted report`);
  } catch (error) {
    next(error);
  }
};

export const updateReportByUid = async (
  req: Request<{ uid: string }, {}, RefuaReport>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const {
    body,
    params: { uid },
  } = req;
  const envId: number = res.locals.envId;
  const relatedRepo = body.type === "malrad" ? edSnapshotsRepo : critBedsRepo;

  try {
    const refuaReport = plainToInstance(RefuaReport, {
      ...body,
      workEnvironmentId: envId,
    });

    const tableName: EdSnapshot[] | CriticalBed[] =
      body.type === "malrad"
        ? refuaReport.edSnapshotsData
        : refuaReport.criticalBedsData;

    const errors = await validate(
      {
        ...refuaReport,
        edSnapshotsData: undefined,
        criticalBedsData: undefined,
      },
      { skipMissingProperties: true }
    );

    if (errors.length > 0) throw errors[0];

    const reportDetails: any[] = tableName.map((data) => ({
      ...data,
      reportUid: uid,
    }));

    const affected = await (
      await reportsRepo.update(
        {
          uid: uid,
          acceptedByDestinationAt: IsNull(),
          workEnvironmentId: envId,
        },
        {
          reportName: refuaReport.reportName,
          sendTimeScheduledAt: refuaReport.sendTimeScheduledAt,
        }
      )
    ).affected;

    if (!affected) {
      res.status(httpStatus.NOT_FOUND).json(affected);
      logger.debug(`Refua report record with uid ${uid} not found`);
    } else {
      await relatedRepo.delete({
        reportUid: uid,
      });

      await relatedRepo.insert(reportDetails);

      res.status(httpStatus.OK).json(affected);
      logger.debug(`Refua report record with uid ${uid} updated successfully`);
    }
  } catch (error) {
    next(error);
  }
};

export const deleteReportByUid = async (
  req: Request<{ uid: string }>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const {
    params: { uid },
  } = req;

  try {
    const affected = await deleteReports(reportsRepo, [uid]);

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

export const updateReportAcceptedByDestination = async (
  req: Request<{}, {}, RefuaReport>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const {
    body: { uid, acceptedByDestinationAt },
  } = req;

  try {
    if (!isUUID(uid)) throw new ValidationError();

    const { affected = 0 } = await reportsRepo.update(
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
