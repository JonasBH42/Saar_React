import { useCoordinates } from "@hooks";
import { useMapEvents } from "react-leaflet";

export default function MapLocationSaver() {
  const [, setCoordinates] = useCoordinates();

  const mapEvents = useMapEvents({
    moveend() {
      setCoordinates(
        [mapEvents.getCenter().lat, mapEvents.getCenter().lng],
        mapEvents.getZoom()
      );
    },
    zoomend() {
      setCoordinates(
        [mapEvents.getCenter().lat, mapEvents.getCenter().lng],
        mapEvents.getZoom()
      );
    },
  });

  return null;
}
