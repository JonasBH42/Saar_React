import { memo, useEffect, useState } from "react";
import L from "leaflet";
import { Marker, Polygon, useMapEvents } from "react-leaflet";
import { VertexIcon } from "@assets/images";

const vertexIcon = L.icon({
  iconUrl: VertexIcon,
  iconSize: [10, 10],
});

function PolygonDrawer({ polygon, setPolygon }) {
  const [currentPolygon, setCurrentPolygon] = useState([]);

  const draw = (event) => {
    if (polygon.polygonClosed) return;
    setCurrentPolygon(
      currentPolygon.concat([[event.latlng.lat, event.latlng.lng]])
    );
  };

  const closePolygon = () => {
    if (polygon.polygonClosed || currentPolygon.length <= 3) return;
    setPolygon((prev) => ({
      ...prev,
      polygonClosed: true,
      points: currentPolygon,
    }));
  };

  const map = useMapEvents({
    click: draw,
    dblclick: closePolygon,
  });

  const disableDoubleClickZoom = () => {
    map.doubleClickZoom.disable();
  };

  useEffect(disableDoubleClickZoom);

  return (
    <>
      {polygon.polygonClosed ? (
        <Polygon
          key={1}
          color="cyan"
          opacity={0.4}
          fillOpacity={0.2}
          positions={polygon.points}
        />
      ) : (
        <>
          <Polygon key={2} color="lime" positions={currentPolygon} />
          {currentPolygon.map((point, index) => (
            <Marker key={index} position={point} icon={vertexIcon} />
          ))}
        </>
      )}
    </>
  );
}

export default memo(PolygonDrawer);
