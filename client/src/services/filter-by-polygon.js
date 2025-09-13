import * as turf from "@turf/turf";

export const filterByPolygon = (data, polygon) => {
  if (polygon.polygonClosed && polygon.points.length > 3) {
    return data.filter((row) =>
      turf.booleanPointInPolygon(
        turf.point([row.latitude, row.longitude]),
        turf.polygon([[...polygon.points, polygon.points[0]]])
      )
    );
  }

  return data;
};
