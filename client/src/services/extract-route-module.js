export const extractFromRoute = (path, routeLocation) => {
  return path.split("/")[routeLocation];
};
