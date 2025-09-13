import { useQuery } from "react-query";
import { useRecoilValue } from "recoil";
import { Marker } from "react-leaflet";
import { useLocation, useNavigate } from "react-router-dom";
import MarkerClusterGroup from "react-leaflet-markercluster";
import {
  MODULES_ROUTES,
  REFETCHING_INTERVAL,
  FORCE_TYPES,
  MAP_MAX_CLUSTER_RADIUS,
} from "@constants";
import { selectedForcesState, formValuesState } from "@states";
import {
  forceIcon,
  policeIcon,
  ambulanceIcon,
  firetruckIcon,
  busIcon,
} from "@assets/icons";
import { PolygonDrawerButton } from "@components";
import { createClusterIcon } from "./createClusterIcon";
import "./mapLayers.css";

const API_ROUTE = MODULES_ROUTES.forces;

const chooseIcon = (forceType) => {
  if (forceType === FORCE_TYPES.POLICE) return policeIcon;
  if (forceType === FORCE_TYPES.AMBULANCE) return ambulanceIcon;
  if (forceType === FORCE_TYPES.FIRE_TRUCK) return firetruckIcon;
  if (forceType === FORCE_TYPES.BUS) return busIcon;
  return forceIcon;
};

function ForcesLayer() {
  const forceList = useRecoilValue(selectedForcesState);
  const { isActive } = useRecoilValue(formValuesState);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const { data } = useQuery(API_ROUTE, {
    refetchInterval: REFETCHING_INTERVAL,
    select: (data) => {
      const parsedData = data.map((force) => ({
        ...force,
        FORCE_TYPE: force.FORCE_TYPE?.ID ?? force.FORCE_TYPE,
      }));
      return parsedData.filter((data) => forceList.includes(data.uid));
    },
  });

  const navigateToEditForm = (uid) => {
    navigate(`${API_ROUTE}/${uid}`);
  };

  if (!data) return null;
  return (
    <>
      {pathname === `/home/${API_ROUTE}` && <PolygonDrawerButton />}
      <MarkerClusterGroup
        maxClusterRadius={MAP_MAX_CLUSTER_RADIUS}
        iconCreateFunction={createClusterIcon(forceIcon)}
      >
        {data.map(({ uid, longitude, latitude, FORCE_TYPE }) => (
          <Marker
            key={uid}
            position={[latitude, longitude]}
            icon={chooseIcon(FORCE_TYPE)}
            eventHandlers={{
              click: () => {
                !isActive && navigateToEditForm(uid);
              },
            }}
          />
        ))}
      </MarkerClusterGroup>
    </>
  );
}

export default ForcesLayer;
