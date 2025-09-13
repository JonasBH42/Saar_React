import { Router } from "express";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";
import { swaggerOptions } from "./data/swaggerOptions";
import { createProxyMiddleware } from "http-proxy-middleware";
import {
  // ENVI_API_URL,
  REFUA_API_URL,
  SIRENS_SERVICE_API_URL,
} from "@environment";
import { parseEnvFromCookies } from "@middlewares";
import {
  getMultipleEventsEnums,
  findEvents,
  findEventsTimedToThisMinute,
  insertEvent,
  updateEventByUid,
  multipleUpdateEvents,
  deleteEventByUid,
  bulkDeleteEvents,
  updateShualIdBySimulatorId,
  updateEventAcceptedByDestination,
  getEventsForReplication,
} from "./events/events.controller";
import {
  bulkDeleteForces,
  multipleUpdateForces,
  deleteForceByUid,
  findForces,
  findForcesTimedToThisMinute,
  upsertForce,
  updateForceAcceptedByDestination,
} from "./forces/forces.controller";
import { getEnums } from "./enums/enums.controller";
import { getClientConfig } from "./client-config/client-config.controller";
import { getLocationByPoint } from "./locations/locations.controller";
import {
  findTrafficJams,
  insertTrafficJam,
} from "./traffic-jams/trafficJams.controller";
import {
  deleteReportByUid,
  findReports,
  findReportsTimedToThisMinute,
  insertReport,
  updateReportAcceptedByDestination,
  updateReportByUid,
} from "./refua/refuaReports.controller";
import {
  findFilters,
  insertFilter,
} from "./custom-filters/custom-filters.controller";
import {
  bulkDeleteBarrage,
  deleteBarrageByUid,
  findBarrages,
  findBarragesTimedToThisMinute,
  getMultipleBarragesEnums,
  insertBarrage,
  multipleUpdateBarrages,
  updateBarrageAcceptedByDestination,
  updateBarrageByUid,
} from "./barrages/barrages.controller";
import {
  bulkDeleteSirenEvents,
  deleteSirenEventByUid,
  findSirenEvents,
  findSirenEventsTimedToThisMinute,
  insertSirenEvent,
  updateSirenEventsAcceptedByDestination,
  updateSirenEventByUid,
} from "./sirens/sirenEvents.controller";
import { findAddressesByEllipse } from "./addresses/addresses.cotroller";
import { findNoEnvi } from "./noEnvi/noEnvi.controller";

export const router = Router();
export const senderRouter = Router();
export const proxyRouter = Router();

const swaggerDocs = swaggerJsdoc(swaggerOptions);

router.use(parseEnvFromCookies);
router.use("/api-docs", swaggerUI.serve);
router.get("/api-docs", swaggerUI.setup(swaggerDocs));

router.route("/enums/:type/:key").get(getEnums);
router.route("/client-config").get(getClientConfig);
/**
 * @swagger
 * /events:
 *  get:
 *    summary: Get events.
 *    description: Get all events from the current environment.
 *    responses:
 *      200:
 *        description: Success!
 */
router.route("/events").get(findEvents).post(insertEvent).put(updateEventByUid);
router
  .route("/events/bulk/:chunkNumber?")
  .post(insertEvent)
  .delete(bulkDeleteEvents);
router.route("/events/multiple").put(multipleUpdateEvents);

/**
 * @swagger
 * /events/aboutToOccur:
 *  get:
 *    summary: Get events that are about to be sent to Shual.
 *    description: Get events that have been sceduled to be sent already.
 *    responses:
 *      200:
 *        description: Success!
 */
router.route("/events/enumsLabels").get(getMultipleEventsEnums);
router.route("/events/:uid").delete(deleteEventByUid);

/**
 * @swagger
 * /forces:
 *  get:
 *    description: Get all forces from the current environment
 *    responses:
 *      200:
 *        description: Success!
 */
router.route("/forces").get(findForces).patch(upsertForce);
/**
 * @swagger
 * /forces/aboutToOccur:
 *  get:
 *    description: Get events that have been sceduled to be sent to Shual this minute
 *    responses:
 *      200:
 *        description: Success!
 */

router.route("/forces/multiple").put(multipleUpdateForces);
router.route("/forces/bulk").delete(bulkDeleteForces);
router.route("/forces/:uid").delete(deleteForceByUid);

router.route("/customFilters").get(findFilters).post(insertFilter);

router.route("/traffic").get(findTrafficJams).post(insertTrafficJam);

router.route("/refua/reports").post(insertReport);
router
  .route("/refua/reports/:uid")
  .delete(deleteReportByUid)
  .put(updateReportByUid);

router.route("/refua/reports/:type/:uid?").get(findReports);

router
  .route("/barrages")
  .get(findBarrages)
  .post(insertBarrage)
  .put(updateBarrageByUid);
router.route("/barrages/enumsLabels").get(getMultipleBarragesEnums);
router.route("/barrages/multiple").put(multipleUpdateBarrages);
router
  .route("/barrages/bulk/:chunkNumber?")
  .delete(bulkDeleteBarrage)
  .post(insertBarrage);
router.route("/barrages/:uid").delete(deleteBarrageByUid);

router
  .route("/sirens")
  .get(findSirenEvents)
  .post(insertSirenEvent)
  .put(updateSirenEventByUid);
router.route("/sirens/bulk").delete(bulkDeleteSirenEvents);
router.route("/sirens/:uid").delete(deleteSirenEventByUid);

/**
 * @swagger
 * /events/timing:
 *  get:
 *    summary: Get events scheduled to this minute.
 *    description: Get events that have been sceduled to be sent to Shual this minute.
 *    responses:
 *      200:
 *        description: Success!
 */
senderRouter.route("/events/timing").get(findEventsTimedToThisMinute);
senderRouter.route("/events/updateShualID").put(updateShualIdBySimulatorId);
senderRouter
  .route("/events/acceptByDestination")
  .put(updateEventAcceptedByDestination);

senderRouter.route("/forces/timing").get(findForcesTimedToThisMinute);
senderRouter
  .route("/forces/acceptByDestination")
  .put(updateForceAcceptedByDestination);

senderRouter.route("/refua/timing").get(findReportsTimedToThisMinute);
senderRouter
  .route("/refua/acceptByDestination")
  .put(updateReportAcceptedByDestination);

senderRouter.route("/barrages/timing").get(findBarragesTimedToThisMinute);
senderRouter
  .route("/barrages/acceptByDestination")
  .put(updateBarrageAcceptedByDestination);

senderRouter.route("/sirens/timing").get(findSirenEventsTimedToThisMinute);
senderRouter
  .route("/sirens/acceptByDestination")
  .put(updateSirenEventsAcceptedByDestination);

senderRouter.route("/addresses").get(findAddressesByEllipse);
senderRouter.route("/locationsByPoint").get(getLocationByPoint);

senderRouter.route("/events/replication").get(getEventsForReplication);

proxyRouter.use(
  "/refua/hospitalNames",
  createProxyMiddleware({
    target: `${REFUA_API_URL}hospitals/districts`,
    changeOrigin: true,
    pathRewrite: { "^/api/refua/hospitalNames": "/" },
  })
);

proxyRouter.use(
  "/sirensList",
  createProxyMiddleware({
    target: `${SIRENS_SERVICE_API_URL}reduced-sirens-list`,
    changeOrigin: true,
    pathRewrite: { "^/api/sirensList": "/" },
  })
);

// proxyRouter.use(
//   "/work-envs",
//   createProxyMiddleware({
//     target: `${ENVI_API_URL}/workEnvs`,
//     changeOrigin: true,
//     pathRewrite: { "^/api/work-envs": "/" },
//   })
// );

proxyRouter.route("/work-envs").get(findNoEnvi);
