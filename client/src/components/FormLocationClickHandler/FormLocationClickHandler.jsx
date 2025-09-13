import { useLocation } from "react-router-dom";
import { useMapEvents } from "react-leaflet";
import { useRecoilState } from "recoil";
import { formValuesState } from "@states";
import { MODULES_ROUTES } from "@constants";
import { getLocation } from "@services";

const modulesWithoutMarker = [MODULES_ROUTES.sirens, MODULES_ROUTES.refua];

function FormLocationClickHandler() {
  const [globalFormValues, setGlobalFormValues] =
    useRecoilState(formValuesState);

  const { pathname } = useLocation();

  useMapEvents({
    click(e) {
      if (
        globalFormValues.isActive &&
        !modulesWithoutMarker.includes(pathname.split("/")[2])
      ) {
        getLocation(e.latlng.lat, e.latlng.lng).then(({ data }) => {
          setGlobalFormValues((prev) => ({
            ...prev,
            latitude: e.latlng.lat,
            longitude: e.latlng.lng,
            district: data?.district,
            subDistrict: data?.subDistrict,
            city: data?.city,
          }));
        });
      }
    },
  });

  return null;
}

export default FormLocationClickHandler;
