import { mapSubdomains, satelliteMapUrl, streetMapUrl } from "@environment";

export const DEFAULT_MAP_CENTER = [31.631613359056796, 39.17497081696581];
export const DEFAULT_MAP_ZOOM = 8;
export const MIN_MAP_ZOOM = 8;
export const MAX_MAP_ZOOM = 18;
export const MAX_MAP_BOUNDS = [
  [29.14902030963373, 33.94547887039765],
  [33.382037, 36.310156],
];
export const MAP_ATTRIBUTION = 'צוות סע"ר | שלד"ג';

export const MAP_MAX_CLUSTER_RADIUS = 40;

export const MAP_TILE_LAYERS = Object.freeze({
  satellite: {
    key: "satellite",
    label: "לווין",
    url: satelliteMapUrl,
    subdomains: mapSubdomains,
  },
  street: {
    key: "street",
    label: "רחוב",
    url: streetMapUrl,
    subdomains: mapSubdomains,
    checked: true,
  },
});
