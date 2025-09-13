import { Outlet, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import {
  EventsLayer,
  ForcesLayer,
  Map,
  SideDrawer,
  FormLayer,
  FormLocationClickHandler,
  SearchGeocoder,
  EditBarrageLayer,
  BarrageLayer,
  MapDrawerConnection,
  SirenEventsLayer,
} from "@components";
import { MODULES_ROUTES } from "@constants";
import { extractFromRoute } from "@services";
import { FULL_WIDTH, DRAWER_DEFAULT_WIDTH } from "@constants";

function Home() {
  return (
    <>
      <Drawer />
      <Map>
        <EventsLayer />
        <ForcesLayer />
        <BarrageLayer />
        <SirenEventsLayer />
        <EditBarrageLayer />
        <FormLayer />
        <FormLocationClickHandler />
        <MapDrawerConnection />
        <SearchGeocoder />
      </Map>
    </>
  );
}

const fullWidthModules = [MODULES_ROUTES.refua];
const MODULE_ROUTE_LOCATION = 2;

function Drawer() {
  const { pathname } = useLocation();

  const selectedModule = extractFromRoute(pathname, MODULE_ROUTE_LOCATION);

  return (
    <SideDrawer
      drawerWidth={
        fullWidthModules.includes(selectedModule)
          ? FULL_WIDTH
          : DRAWER_DEFAULT_WIDTH
      }
    >
      <ToastContainer />
      <Outlet />
    </SideDrawer>
  );
}

export default Home;
