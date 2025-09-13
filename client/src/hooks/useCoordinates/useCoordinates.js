import { DEFAULT_MAP_CENTER, DEFAULT_MAP_ZOOM } from "@constants";

export function useCoordinates(
  defaultValues = {
    center: DEFAULT_MAP_CENTER,
    zoom: DEFAULT_MAP_ZOOM,
  }
) {
  return [
    {
      ...defaultValues,
      ...extractCoordinatesFromRoute(localStorage.getItem("coordinates")),
    },
    (center, zoom) =>
      localStorage.setItem(
        "coordinates",
        generateCoordinatesRoute(center, zoom)
      ),
  ];
}

const extractCoordinatesFromRoute = (coordinatesStr = "") => {
  const coordinatesPattern = /@(.*),(.*),(.*)z/;
  const coordinatesPatternMatch = coordinatesStr?.match(coordinatesPattern);

  const [, lat, lng, zoom] = coordinatesPatternMatch ?? [];
  const coordinates = {
    center: [parseFloatWithoutNaN(lat), parseFloatWithoutNaN(lng)],
    zoom: parseFloatWithoutNaN(zoom),
  };

  if (!coordinates.center[0] || !coordinates.center[1] || !coordinates.zoom) {
    return null;
  }

  return coordinates;
};

const parseFloatWithoutNaN = (val) => !isNaN(Number(val)) && Number(val);

const generateCoordinatesRoute = ([lat, lng], zoom) => {
  return `@${lat},${lng},${zoom}z`;
};
