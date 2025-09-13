import { useQuery } from "react-query";
import { useRecoilValue } from "recoil";
import { Marker } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import {
  MAP_MAX_CLUSTER_RADIUS,
  MODULES_ROUTES,
  REFETCHING_INTERVAL,
} from "@constants";
import { selectedSirenEventsState } from "@states";
import { sirenIcon } from "@assets/icons";
import { iconStyleNames } from "@constants";
import { createClusterIcon } from "./createClusterIcon";
import "./mapLayers.css";

const API_ROUTE = MODULES_ROUTES.sirens;

const colorByStatus = {
  1: { cluster: "clusterGreen", siren: "sirenGreen" },
  4: { cluster: "clusterRed", siren: "sirenRed" },
  7: { cluster: "clusterRed", siren: "sirenRed" },
};

function SirenEventsLayer() {
  const sirenEventList = useRecoilValue(selectedSirenEventsState);

  const { data: sirenEventsToDisplay } = useQuery(API_ROUTE, {
    refetchInterval: REFETCHING_INTERVAL,
    select: (data) => {
      const parsedData = data.map((sirenEvent) => ({
        uid: sirenEvent.uid,
        status: sirenEvent.status,
        relatedSirens: sirenEvent.relatedSirens.map(({ mdlc }) => mdlc),
      }));

      return parsedData.filter((data) => sirenEventList.includes(data.uid));
    },
  });

  const allMDLCsToDisplay = sirenEventsToDisplay?.reduce((mdlcList, obj) => {
    return mdlcList.concat(obj.relatedSirens.map((mdlc) => mdlc));
  }, []);

  const { data: sirensWithLocations } = useQuery(
    ["sirensList", { withCredentials: false }],
    {
      refetchInterval: REFETCHING_INTERVAL,
      select: (sirens) => {
        const parsedData = sirens.map((siren) => ({
          mdlc: siren.mdlc,
          latitude: siren.latitude,
          longitude: siren.longitude,
        }));

        const mdlcsWithLocations = parsedData.filter((data) =>
          allMDLCsToDisplay?.includes(data.mdlc)
        );

        return Object.fromEntries(
          mdlcsWithLocations.map((siren) => [siren.mdlc, siren])
        );
      },
    }
  );

  if (!sirensWithLocations || !sirenEventsToDisplay) return null;
  return (
    <>
      {sirenEventsToDisplay.map(({ uid, relatedSirens, status }) => (
        <MarkerClusterGroup
          key={`${uid}`}
          maxClusterRadius={MAP_MAX_CLUSTER_RADIUS}
          iconCreateFunction={createClusterIcon(
            sirenIcon(),
            iconStyleNames.cluster[colorByStatus[status.ID ?? status].cluster]
          )}
        >
          {relatedSirens.map((mdlc) => (
            <Marker
              key={`${uid}_${mdlc}`}
              position={[
                sirensWithLocations[mdlc].latitude,
                sirensWithLocations[mdlc].longitude,
              ]}
              icon={sirenIcon(
                iconStyleNames.sirens[colorByStatus[status.ID ?? status].siren]
              )}
            />
          ))}
        </MarkerClusterGroup>
      ))}
    </>
  );
}

export default SirenEventsLayer;
