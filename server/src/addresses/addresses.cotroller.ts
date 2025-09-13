import { NextFunction, Request, Response } from "express";
import { convertPolygonToGeom, ellipseToPolygon } from "@services";
import ORM from "@ORM";
import logger from "@logger";
import { ORM_CONFIG } from "@environment";

export const findAddressesByEllipse = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { polygon } = req.query;

  try {
    const data = await ORM.manager.query(
      `
    SELECT * FROM ${
      ORM_CONFIG.schema
    }.addresses WHERE ST_Contains(ST_GeomFromText('POLYGON((${convertPolygonToGeom(
        ellipseToPolygon(JSON.parse(polygon as string))
      )}))') , ST_MakePoint(y,x));
  `
    );

    res.json(data);
    logger.debug("get addresses by ellipse was successful");
  } catch (error) {
    next(error);
  }
};
