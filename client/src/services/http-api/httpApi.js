import axios from "axios";
import { API_URL } from "@environment";

axios.defaults.withCredentials = true;

export const api = axios.create({ baseURL: API_URL });

export const getQueryData = async ({ queryKey: [path, options] }) => {
  const res = await api.get(`/${path}`, { ...options });

  return res.data;
};

export const updateQueryData = async ({ method, data, path }) => {
  const res = await api({ method, url: `/${path}`, data });

  return res.data;
};
