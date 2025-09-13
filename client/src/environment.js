export const NODE_ENV = process.env.NODE_ENV;
export const HOST_ENV = process.env.REACT_APP_HOST_ENV ?? "development";

export const API_URL =
  process.env.REACT_APP_API_URL ??
  "https://app-ext-saar-dev.azurewebsites.net/api/";

export const satelliteMapUrl =
  process.env.REACT_APP_SATELLITE_MAP_URL ??
  "https://{s}.google.com/vt/lyrs=s,h?hl=he&x={x}&y={y}&z={z}";

export const streetMapUrl =
  process.env.REACT_APP_STREET_MAP_URL ??
  "https://{s}.google.com/vt/?hl=he&x={x}&y={y}&z={z}";

export const mapSubdomains = process.env.REACT_APP_MAP_SUBDOMAINS?.split(
  ","
) ?? ["mt0", "mt1", "mt2", "mt3"];

export const muiLicenseKey =
  process.env.REACT_APP_MUI_LICENSE_KEY ??
  "3d0e6ed6724d7574233eb264b25dcaa8T1JERVI6NDI3NjcsRVhQSVJZPTE2ODI4NTU5NDQwMDAsS0VZVkVSU0lPTj0x";

export const ENV_COOKIE_NAME =
  process.env.REACT_APP_ENV_COOKIE_NAME ?? "workEnvironment";
