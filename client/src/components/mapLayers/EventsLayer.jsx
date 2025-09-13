import { useQuery } from "react-query";
import { useRecoilValue } from "recoil";
import { Marker } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import { useLocation, useNavigate } from "react-router-dom";
import {
  MAP_MAX_CLUSTER_RADIUS,
  MODULES_ROUTES,
  REFETCHING_INTERVAL,
} from "@constants";
import { selectedEventsState, formValuesState } from "@states";
import { eventIcon } from "@assets/icons";
import { PolygonDrawerButton } from "@components";
import { createClusterIcon } from "./createClusterIcon";
import "./mapLayers.css";

const API_ROUTE = MODULES_ROUTES.events;

function EventsLayer() {
  const eventList = useRecoilValue(selectedEventsState);
  const { isActive } = useRecoilValue(formValuesState);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const { data } = useQuery(API_ROUTE, {
    refetchInterval: REFETCHING_INTERVAL,
    select: (data) => data.filter((data) => eventList.includes(data.uid)),
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
        iconCreateFunction={createClusterIcon(eventIcon)}
      >
        {data.map(({ uid, latitude, longitude }) => (
          <Marker
            key={uid}
            position={[latitude, longitude]}
            icon={eventIcon}
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

export default EventsLayer;
