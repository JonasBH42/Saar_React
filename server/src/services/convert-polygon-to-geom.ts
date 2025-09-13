export const convertPolygonToGeom = (polygon: any[]) => {
  let str = "";

  polygon.forEach((point) => (str += `${point[0]} ${point[1]}, `));
  str = str.slice(0, -2);

  return str;
};
