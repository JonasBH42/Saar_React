import "module-alias/register";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import {
  CLIENT_BUILD_FOLDER,
  REQUEST_WEIGHT_LIMIT,
  PORT,
  SIMULATOR_API_URLS,
} from "@environment";
import { initializeORM } from "@ORM";
import { router, proxyRouter, senderRouter } from "@router";
import { logRequest, errorHandler } from "@middlewares";
import logger from "@logger";
import { setupEnums } from "./enums/enums.config";
import { setupDefaultFilters } from "./custom-filters/defaultFilters";

const app = express();
const api = express.Router();

const corsConfig = {
  origin: SIMULATOR_API_URLS,
  credentials: true,
};

api
  .use(cookieParser())
  .use(express.json({ limit: REQUEST_WEIGHT_LIMIT }))
  .use(cors(corsConfig))
  .use(logRequest)
  .use(proxyRouter)
  .use(senderRouter)
  .use(router);

app.use("/api", api);
app.use(express.static(CLIENT_BUILD_FOLDER)).get("*", (req, res, next) => {
  if (!req.originalUrl.startsWith("/api")) {
    return res.sendFile("index.html", { root: `./${CLIENT_BUILD_FOLDER}` });
  }

  return next();
});
app.use(errorHandler);

initializeORM().then(async () => {
  await setupEnums();
  await setupDefaultFilters();

  app.listen(PORT, () =>
    logger.info(`Express server started at http://localhost:${PORT}/`)
  );
});
