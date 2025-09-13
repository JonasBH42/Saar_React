import { isUUID } from "class-validator";
import ORM from "@ORM";
import { CLIENT_CONFIG, ORM_CONFIG } from "@environment";
import Event from "./events.entity";
import { city, district, subDistrict } from "../locations/locations.service";

const EventRepo = ORM.getRepository(Event);

export const getHighestSimulatorId = async (envId: number): Promise<number> => {
  const data = await ORM.query(
    `SELECT MAX("simulatorId") FROM ${ORM_CONFIG.schema}.${EventRepo.metadata.tableName} WHERE "workEnvironmentId" = ${envId}`
  );

  return data?.[0]?.max ?? 0;
};

export const insertEvents = async (
  events: Event[],
  envId: number,
  chunkNumber?: number
): Promise<Event[]> => {
  try {
    const parsedEvents: Event[] = [];

    let maxId = await getHighestSimulatorId(envId);

    for (const [i, obj] of events.entries()) {
      if (!obj.simulatorId) {
        if (typeof chunkNumber !== "undefined") {
          const data = await Promise.all([
            district(obj.latitude, obj.longitude),
            subDistrict(obj.latitude, obj.longitude),
            city(obj.latitude, obj.longitude),
          ]);

          obj.simulatorId =
            1 + maxId + i + chunkNumber * CLIENT_CONFIG.bulkF5ChunkSize;
          obj.district = data?.[0][0]?.district;
          obj.subDistrict = data?.[1][0]?.subdistrict;
          obj.city = data?.[2][0]?.city;
        } else {
          obj.simulatorId = ++maxId;
        }
      }

      parsedEvents.push({
        ...obj,
        acceptedByDestinationAt: undefined,
        createdAt: undefined,
        updatedAt: undefined,
        deletedAt: undefined,
      });
    }

    await EventRepo.insert(parsedEvents);

    return parsedEvents;
  } catch (error) {
    throw error;
  }
};

export const deleteEvents = async (uids: string[]): Promise<number> => {
  try {
    const validUids = uids.filter((u) => isUUID(u));
    if (!validUids.length) return 0;

    const { affected = 0 } = await EventRepo.softDelete(validUids);

    return affected;
  } catch (error) {
    throw error;
  }
};
