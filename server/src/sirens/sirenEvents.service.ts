import { Response } from "express";
import { isUUID, validate } from "class-validator";
import { plainToInstance } from "class-transformer";
import { Repository } from "typeorm";
import ORM from "@ORM";
import logger from "@logger";
import { httpStatus } from "@data";
import SirenEvent from "./sirenEvents.entity";
import RelatedSiren from "./relatedSirens.entity";

const sirensEventsRepo: Repository<SirenEvent> = ORM.getRepository(SirenEvent);
const relatedSirensRepo: Repository<RelatedSiren> =
  ORM.getRepository(RelatedSiren);

export const insertSirensEventData = async (
  repo: Repository<SirenEvent>,
  body: SirenEvent,
  res: Response
) => {
  try {
    if (checkIfDataIsRightType(body.relatedSirens, relatedSirensRepo)) {
      await operation(repo, body);
    } else {
      logger.debug(
        "sirens event came without data, or with type thats not exicts, sirens event will not be saved"
      );
      res.sendStatus(httpStatus.BAD_REQUEST);
    }
  } catch (error) {
    logger.error(error);
    throw error;
  }
};

const checkIfDataIsRightType = (
  data: RelatedSiren[],
  repo: Repository<RelatedSiren>
): boolean => !!repo.create(data);

const operation = async (repo: Repository<SirenEvent>, body: SirenEvent) => {
  try {
    const sirensEventsData = plainToInstance(SirenEvent, [body]);

    for (const sirensEvent of sirensEventsData) {
      const errors = await validate(sirensEvent);
      if (errors.length) throw errors[0];
    }

    return await repo.save(sirensEventsData);
  } catch (error) {
    throw error;
  }
};

export const deleteSirenEvents = async (uids: string[]): Promise<number> => {
  try {
    const validUids = uids.filter((u) => isUUID(u));
    if (!validUids.length) return 0;

    const { affected } = await sirensEventsRepo.delete(validUids);

    if (affected) return affected;
    return 0;
  } catch (error) {
    throw error;
  }
};
