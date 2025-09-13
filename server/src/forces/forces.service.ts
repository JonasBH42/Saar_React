import { isUUID } from "class-validator";
import ORM from "@ORM";
import Force from "./forces.entity";

const ForceRepo = ORM.getRepository(Force);

export const deleteForces = async (uids: string[]): Promise<number> => {
  try {
    const validUids = uids.filter((u) => isUUID(u));
    if (!validUids.length) return 0;

    const { affected = 0 } = await ForceRepo.softDelete(validUids);

    return affected;
  } catch (error) {
    throw error;
  }
};
