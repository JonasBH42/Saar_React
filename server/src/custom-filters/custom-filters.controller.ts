import { NextFunction, Request, Response } from "express";
import { plainToInstance } from "class-transformer";
import { httpStatus } from "@data";
import logger from "@logger";
import ORM from "@ORM";
import { deleteFilters, insertFilters } from "./custom-filters.service";
import CustomFilter from "./custom-filters.entity";

const FiltersRepo = ORM.getRepository(CustomFilter);

export const findFilters = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const data = await FiltersRepo.find();
    res.json(data);
    logger.debug("get all custom filters was successful");
  } catch (error) {
    next(error);
  }
};

export const insertFilter = async (
  req: Request<{}, {}, { filter: any }>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const filterBody = req.body.filter;

  try {
    const filters = plainToInstance(
      CustomFilter,
      Array.isArray(filterBody) ? filterBody : [filterBody]
    );

    const data = await insertFilters(filters);

    if (!data.length) {
      res.status(httpStatus.BAD_REQUEST).json(data);
      logger.debug("The array was empty. No records of filters were inserted");
    } else {
      res.status(httpStatus.OK).json(data);
      logger.debug(`succesfully inserted ${data.length} records`);
    }
  } catch (error) {
    next(error);
  }
};

export const deleteFilterByUid = async (
  req: Request<{ uid: string }>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const {
    params: { uid },
  } = req;

  try {
    const affected = await deleteFilters([uid]);

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
