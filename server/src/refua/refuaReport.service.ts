import { Response } from "express";
import { isUUID, validate } from "class-validator";
import { plainToInstance } from "class-transformer";
import { Repository } from "typeorm";
import ORM from "@ORM";
import logger from "@logger";
import { httpStatus } from "@data";
import RefuaReport from "./refuaReport.entity";
import CriticalBed from "./criticalBeds.entity";
import EdSnapshot from "./edSnapshot.entity";

const edSnapshotRepo: Repository<EdSnapshot> = ORM.getRepository(EdSnapshot);
const criticalBedsRepo: Repository<CriticalBed> =
  ORM.getRepository(CriticalBed);

export const insertReportData = async (
  repo: Repository<RefuaReport>,
  body: RefuaReport,
  res: Response
) => {
  try {
    if (
      (body.type === "malrad" &&
        checkIfDataIsRightType(body.edSnapshotsData, edSnapshotRepo)) ||
      (body.type === "beds" &&
        checkIfDataIsRightType(body.criticalBedsData, criticalBedsRepo))
    ) {
      await operation(repo, body);
    } else {
      logger.debug(
        "report came without data, or with type thats not exict, report will not be saved"
      );
      res.sendStatus(httpStatus.BAD_REQUEST);
    }
  } catch (error) {
    logger.error(error);
    throw error;
  }
};

const checkIfDataIsRightType = (
  data: CriticalBed[] | EdSnapshot[],
  repo: Repository<EdSnapshot | CriticalBed>
): boolean => !!repo.create(data);

const operation = async (repo: Repository<RefuaReport>, body: RefuaReport) => {
  try {
    const reportData = plainToInstance(RefuaReport, [body]);

    for (const report of reportData) {
      const errors = await validate(report);
      if (errors.length) throw errors[0];
    }

    return await repo.save(reportData);
  } catch (error) {
    throw error;
  }
};

export const deleteReports = async (
  repo: Repository<RefuaReport>,
  uids: string[]
): Promise<number> => {
  try {
    const validUids = uids.filter((u) => isUUID(u));
    if (!validUids.length) return 0;

    const { affected } = await repo.delete(validUids);

    return affected ?? 0;
  } catch (error) {
    throw error;
  }
};
