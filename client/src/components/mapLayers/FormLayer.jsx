import { Marker } from "react-leaflet";
import { useRecoilState } from "recoil";
import { formValuesState } from "@states";
import { targetIcon } from "@assets/icons";
import "./mapLayers.css";
import { getLocation } from "@services";
import { useEffect } from "react";

function FormLayer() {
  const [globalFormValues, setGlobalFormValues] =
    useRecoilState(formValuesState);

  useEffect(() => {
    if (globalFormValues.latitude && globalFormValues.longitude) {
      getLocation(globalFormValues.latitude, globalFormValues.longitude).then(
        ({ data }) => {
          setGlobalFormValues((prev) => ({
            ...prev,
            district: data?.district,
            subDistrict: data?.subDistrict,
            city: data?.city,
          }));
        }
      );
    }
  }, [
    globalFormValues.latitude,
    globalFormValues.longitude,
    setGlobalFormValues,
  ]);

  if (!globalFormValues?.isActive) return null;

  return (
    <Marker
      key={"formMarker"}
      position={[
        globalFormValues.latitude ?? "",
        globalFormValues.longitude ?? "",
      ]}
      icon={targetIcon}
    />
  );
}

export default FormLayer;
