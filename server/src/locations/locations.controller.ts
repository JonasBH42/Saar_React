import { NextFunction, Request, Response } from "express";
import { city, district, subDistrict } from "./locations.service";

export const getLocationByPoint = async (
  req: Request<{}, {}, {}, { latitude: number; longitude: number }>,
  res: Response,
  next: NextFunction
) => {
  const {
    query: { latitude, longitude },
  } = req;

  try {
    const data = await Promise.all([
      district(latitude, longitude),
      subDistrict(latitude, longitude),
      city(latitude, longitude),
    ]);

    res.send({
      district: data?.[0][0]?.district,
      subDistrict: data?.[1][0]?.subdistrict,
      city: data?.[2][0]?.city,
    });
  } catch (error) {
    next(error);
  }
};
