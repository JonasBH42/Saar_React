import { useEffect } from "react";
import {
  AttributionControl,
  LayersControl,
  MapContainer,
  TileLayer,
  Marker,
  LayerGroup,
} from "react-leaflet";
import _ from "lodash";
import { useQuery } from "react-query";
import { useRecoilState, useRecoilValue } from "recoil";
import { useLocation } from "react-router-dom";
import MarkerClusterGroup from "react-leaflet-markercluster";
import { useCoordinates } from "@hooks";
import { createClusterIcon } from "@components/mapLayers/createClusterIcon";
import { iconStyleNames } from "@constants";
import { emptyObjectValues, filterByPolygon } from "@services";
import { formPolygonState, selectedSirenEventsState } from "@states";
import {
  DEFAULT_MAP_CENTER,
  DEFAULT_MAP_ZOOM,
  MAX_MAP_BOUNDS,
  MAX_MAP_ZOOM,
  MIN_MAP_ZOOM,
  MAP_ATTRIBUTION,
  MAP_TILE_LAYERS,
  MAP_MAX_CLUSTER_RADIUS,
} from "@constants";
import MapLocationSaver from "./MapLocationSaver";
import { STATIC_MAP_LAYERS } from "./staticMapLayers";
import "./Map.css";

function Map({ children }) {
  const [coordinates] = useCoordinates({
    center: DEFAULT_MAP_CENTER,
    zoom: DEFAULT_MAP_ZOOM,
  });

  return (
    <MapContainer
      center={coordinates.center}
      zoom={coordinates.zoom}
      minZoom={MIN_MAP_ZOOM}
      maxZoom={MAX_MAP_ZOOM}
      maxBounds={MAX_MAP_BOUNDS}
      maxBoundsViscosity={1}
      zoomControl={false}
      attributionControl={false}
    >
      {
        <LayersControl position="topleft">
          {Object.keys(STATIC_MAP_LAYERS).map((layer) => (
            <StaticLayer
              key={STATIC_MAP_LAYERS[layer].name}
              layer={STATIC_MAP_LAYERS[layer]}
            />
          ))}
        </LayersControl>
      }
      <AttributionControl prefix={false} position={"bottomleft"} />
      <LayersControl position="bottomleft">
        {Object.values(MAP_TILE_LAYERS).map(({ key }) => (
          <GenericTileLayer key={key} mapType={key} />
        ))}
      </LayersControl>
      <MapLocationSaver />
      {children}
    </MapContainer>
  );
}

function GenericTileLayer({ mapType }) {
  return (
    <LayersControl.BaseLayer
      checked={MAP_TILE_LAYERS[mapType].checked}
      name={MAP_TILE_LAYERS[mapType].label}
    >
      <TileLayer
        {...MAP_TILE_LAYERS[mapType]}
        attribution={`<b>${MAP_ATTRIBUTION}</b>`}
      />
    </LayersControl.BaseLayer>
  );
}

function StaticLayer({ layer }) {
  const { pathname } = useLocation();
  const [formPolygon, setFormPolygon] = useRecoilState(formPolygonState);

  const { data } = useQuery([
    layer.key,
    {
      withCredentials: false,
    },
  ]);

  useEffect(() => {
    setFormPolygon((prev) => {
      return {
        ...prev,
        data: prev.polygonClosed
          ? { ...prev.data, [layer.dataName]: filterByPolygon(data, prev) }
          : emptyObjectValues(prev.data),
      };
    });
  }, [formPolygon.polygonClosed, setFormPolygon, data, layer.dataName]);

  const isSirenEventLayerEmpty = _.isEmpty(
    useRecoilValue(selectedSirenEventsState)
  );

  return (
    <LayersControl.Overlay
      name={layer.name}
      checked={
        layer.autochecked?.includes(pathname.split("/")[2]) &&
        isSirenEventLayerEmpty &&
        layer.key === STATIC_MAP_LAYERS.sirens.key
      }
    >
      <LayerGroup>
        <MarkerClusterGroup
          maxClusterRadius={MAP_MAX_CLUSTER_RADIUS}
          iconCreateFunction={createClusterIcon(
            layer.icon,
            iconStyleNames.cluster.clusterDefault
          )}
        >
          {filterByPolygon(data, formPolygon)?.map((marker) => (
            <Marker
              key={marker[layer.uid]}
              position={[marker.latitude, marker.longitude]}
              icon={layer.icon}
            />
          ))}
        </MarkerClusterGroup>
      </LayerGroup>
    </LayersControl.Overlay>
  );
}

export default Map;
