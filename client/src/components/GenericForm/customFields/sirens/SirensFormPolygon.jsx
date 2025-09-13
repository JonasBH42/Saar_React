import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { Controller } from "react-hook-form";
import { Button } from "@mui/material";
import { Edit, Delete, DisabledByDefault, Done } from "@mui/icons-material";
import { formPolygonState } from "@states";

function SirensFormPolygon({ obj, control, isFormDisabled }) {
  const [formPolygon, setFormPolygon] = useRecoilState(formPolygonState);

  const polygonDrawer = {
    icon: formPolygon.drawMode ? <Delete /> : <Edit />,
    name: formPolygon.drawMode ? "מחק פוליגון" : "ציור פוליגון",
    handler: () => {
      if (formPolygon.drawMode) {
        setFormPolygon((prev) => ({ ...prev, points: [], drawMode: false }));
      } else {
        setFormPolygon((prev) => ({ ...prev, drawMode: true }));
      }
    },
  };

  const PolygonIcon = ({ onChange }) => {
    useEffect(() => {
      onChange(formPolygon.polygonClosed);
    }, [onChange]);

    return formPolygon.polygonClosed ? <Done /> : <DisabledByDefault />;
  };

  useEffect(() => {
    setFormPolygon((prev) => ({
      ...prev,
      polygonClosed: false,
      points: [],
    }));
  }, [formPolygon.drawMode, setFormPolygon]);

  useEffect(
    () => () =>
      setFormPolygon((prev) => ({
        ...prev,
        polygonClosed: false,
        points: [],
        drawMode: false,
      })),
    [setFormPolygon]
  );

  return (
    <Controller
      name={obj.key}
      control={control}
      render={({ field }) => (
        <div
          style={{
            padding: "50px",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Button
            sx={{
              marginLeft: "20px",
              display: "flex",
              flexDirection: "row-reverse",
            }}
            startIcon={polygonDrawer.icon}
            onClick={polygonDrawer.handler}
            variant="contained"
            size="large"
            disabled={obj.disabled || isFormDisabled}
          >
            {polygonDrawer.name}
          </Button>
          {isFormDisabled ?? <PolygonIcon onChange={field.onChange} />}
        </div>
      )}
    />
  );
}

export default SirensFormPolygon;
