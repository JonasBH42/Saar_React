import { Fragment } from "react";
import { useQuery } from "react-query";
import { useRecoilValue } from "recoil";
import { Circle, Polygon } from "react-leaflet";
import { useLocation, useNavigate } from "react-router-dom";
import { PolygonDrawerButton } from "@components";
import { MODULES_ROUTES, REFETCHING_INTERVAL } from "@constants";
import { ellipseToPolygon } from "@services";
import { formValuesState, selectedBarragesState } from "@states";
import "./mapLayers.css";

const API_ROUTE = MODULES_ROUTES.barrages;

function BarrageLayer() {
  const barrageList = useRecoilValue(selectedBarragesState);
  const { isActive } = useRecoilValue(formValuesState);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const { data } = useQuery(API_ROUTE, {
    refetchInterval: REFETCHING_INTERVAL,
    select: (data) => data.filter(({ uid }) => barrageList.includes(uid)),
  });

  const navigateToEditForm = (uid) => navigate(`${API_ROUTE}/${uid}`);

  if (!data) return null;
  return (
    <>
      {pathname === `/home/${API_ROUTE}` && <PolygonDrawerButton />}
      {data.map(
        ({
          uid,
          latitude,
          longitude,
          barrageRadius,
          radius1,
          radius2,
          azimut,
        }) => (
          <Fragment key={`frag_${uid}`}>
            <Circle
              key={uid}
              center={[latitude, longitude]}
              radius={barrageRadius * 1000}
              fillOpacity={0.1}
              color="lightBlue"
            />
            <Polygon
              key={`GoldEllipse_${uid}`}
              positions={ellipseToPolygon({
                radii: [radius2, radius1],
                coordinates: [latitude, longitude],
                azimut,
              })}
              color="orange"
              fillOpacity={0.8}
              eventHandlers={{
                click: () => !isActive && navigateToEditForm(uid),
              }}
            />
          </Fragment>
        )
      )}
    </>
  );
}

export default BarrageLayer;
