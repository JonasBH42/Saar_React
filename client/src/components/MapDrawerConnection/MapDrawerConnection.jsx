import { useRecoilState } from "recoil";
import { formPolygonState } from "@states";
import { PolygonDrawer } from "@components";

function MapDrawerConnection() {
  const [formPolygon, setFormPolygon] = useRecoilState(formPolygonState);

  return (
    formPolygon.drawMode && (
      <PolygonDrawer polygon={formPolygon} setPolygon={setFormPolygon} />
    )
  );
}

export default MapDrawerConnection;
