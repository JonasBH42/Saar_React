import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import L from "leaflet";
import { useMap } from "react-leaflet";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.js";
import { geocoderIcon } from "@assets/icons";
import { geoCoderValues } from "@states";
import "./SearchGeocoder.css";

export default function SearchGeocoder() {
  const map = useMap();
  const setGeoValues = useSetRecoilState(geoCoderValues);

  useEffect(() => {
    if (!map) return;

    let geocoder = L.Control.Geocoder.nominatim({
      geocodingQueryParams: {
        "accept-language": "he",
      },
    });

    if (typeof URLSearchParams !== "undefined") {
      const params = new URLSearchParams();
      const geocoderString = params.get("geocoder");
      if (L.Control.Geocoder?.[geocoderString]) {
        geocoder = L.Control.Geocoder[geocoderString]();
      } else if (geocoderString) {
        console.warn("Unsupported geocoder", geocoderString);
      }
    }
    let marker = null;

    L.Control.geocoder({
      query: "",
      placeholder: "חפש מיקום או כתובת",
      defaultMarkGeocode: false,
      errorMessage: "לא נמצאה תוצאה מתאימה",
      geocoder,
      position: "topleft",
    })
      .on("markgeocode", (e) => {
        if (marker) map.removeLayer(marker);
        const latlng = e.geocode.center;
        setGeoValues(latlng);
        marker = L.marker(latlng, { icon: geocoderIcon })
          .addTo(map)
          .bindPopup(e.geocode.name)
          .openPopup()
          .addEventListener("dblclick", () => {map.removeLayer(marker); setGeoValues();});
      })
      .addTo(map);
  }, [map, setGeoValues]);

  return null;
}
