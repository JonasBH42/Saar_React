import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { IconButton } from "@mui/material";
import { Edit, Close } from "@mui/icons-material";
import { polygonPositionsState } from "@states";
import PolygonDrawer from "./PolygonDrawer";

function PolygonDrawerButton() {
  const [drawMode, setDrawMode] = useState(false);
  const [polygon, setPolygon] = useRecoilState(polygonPositionsState);

  const polygonDrawer = {
    icon: drawMode ? <Close /> : <Edit />,
    name: "ציור פוליגון",
    handler: () => {
      if (drawMode) {
        setPolygon((prev) => ({ ...prev, points: [] }));
        setDrawMode(false);
      } else {
        setDrawMode(true);
      }
    },
  };

  useEffect(() => {
    setPolygon({ polygonClosed: false, points: [] });
  }, [drawMode, setPolygon]);

  return (
    <>
      <IconButton
        sx={{
          backgroundColor: "white",
          position: "fixed",
          zIndex: 1000,
          left: 10,
          top: 135,
          border: 0.2,
          borderRadius: 2,
          height: 50,
          width: 50,
          "&:hover": {
            bgcolor: () => "#E7E7E7",
          },
        }}
        onClick={polygonDrawer.handler}
        label={polygonDrawer.name}
      >
        {polygonDrawer.icon}
      </IconButton>
      {drawMode && <PolygonDrawer polygon={polygon} setPolygon={setPolygon} />}
    </>
  );
}

export default PolygonDrawerButton;
