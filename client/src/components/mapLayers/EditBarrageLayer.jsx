import { useRecoilValue } from "recoil";
import { Circle, Polygon } from "react-leaflet";
import { formValuesState } from "@states";
import { ellipseToPolygon } from "@services";
import { ellipseMaxCoordinates, ellipseMinCoordinates } from "@services";

const getRandomCoordinate = (min, max) => Math.random() * (max - min) + min;

function EditBarrageLayer() {
  const {
    latitude = "",
    longitude = "",
    radius1 = "0",
    radius2 = "0",
    azimut = "0",
    barrageRadius = "0",
    vibeEllipsesNumber = "0",
    isActive,
  } = useRecoilValue(formValuesState);

  const maxLat = ellipseMaxCoordinates(latitude, barrageRadius);
  const minLat = ellipseMinCoordinates(latitude, barrageRadius);
  const maxLng = ellipseMaxCoordinates(longitude, barrageRadius);
  const minLng = ellipseMinCoordinates(longitude, barrageRadius);

  const randomLatLng = [];
  for (let i = 0; i < vibeEllipsesNumber; i++) {
    randomLatLng.push([
      getRandomCoordinate(minLat, maxLat).toString(),
      getRandomCoordinate(minLng, maxLng).toString(),
    ]);
  }

  if (!isActive) return null;
  return (
    <>
      <Polygon
        key={"ellipseForm"}
        positions={ellipseToPolygon({
          radii: [radius2, radius1],
          coordinates: [latitude, longitude],
          azimut,
        })}
        color="red"
      />

      <Circle center={[latitude, longitude]} radius={barrageRadius * 1000} />

      {randomLatLng.map((coordinates, index) => (
        <Polygon
          key={index}
          positions={ellipseToPolygon({
            radii: [radius2, radius1],
            coordinates,
            azimut,
          })}
          color="orange"
        />
      ))}
    </>
  );
}

export default EditBarrageLayer;
