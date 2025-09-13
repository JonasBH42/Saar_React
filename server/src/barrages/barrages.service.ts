import { isUUID } from "class-validator";
import { Repository } from "typeorm";
import ORM from "@ORM";
import Barrage from "./barrages.entity";
import { district, subDistrict } from "../locations/locations.service";

const barragesRepo: Repository<Barrage> = ORM.getRepository(Barrage);

export const insertBarrages = async (
  barrages: Barrage[],
  chunkNumber?: number
): Promise<Barrage[]> => {
  try {
    const parsedBarrages: Barrage[] = [];

    for (const obj of barrages.values()) {
      if (typeof chunkNumber !== "undefined") {
        const data = await Promise.all([
          district(obj.latitude, obj.longitude),
          subDistrict(obj.latitude, obj.longitude),
        ]);

        obj.district = data?.[0][0]?.district;
        obj.subDistrict = data?.[1][0]?.subdistrict;
      }

      parsedBarrages.push({
        ...obj,
        acceptedByDestinationAt: undefined,
        createdAt: undefined,
        updatedAt: undefined,
        deletedAt: undefined,
      });
    }

    await barragesRepo.insert(parsedBarrages);

    return parsedBarrages;
  } catch (error) {
    throw error;
  }
};

export const deleteBarrage = async (uids: string[]): Promise<number> => {
  try {
    const validUids = uids.filter((u) => isUUID(u));
    if (!validUids.length) return 0;

    const { affected } = await barragesRepo.delete(validUids);

    if (affected) return affected;
    return 0;
  } catch (error) {
    throw error;
  }
};
