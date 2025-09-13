import { api } from "./http-api/httpApi";

export const getLocation = (latitude, longitude) =>
  api.get(`/locationsByPoint`, {
    params: { latitude, longitude },
  });
