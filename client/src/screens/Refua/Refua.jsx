import { Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Icon } from "@iconify/react";
import "@styles/main-page.css";
import "./Refua.css";

const BASE_PATH = "/home/refua";

function Refua() {
  const navigate = useNavigate();
  const [pressedButton, setPressedButton] = useState("");

  const handleClick = (path) => {
    setPressedButton(path);
    navigate(`${BASE_PATH}/${path}`);
  };
  return (
    <>
      <div
        style={{
          padding: "30px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-evenly",
          maxHeight: "80vh",
        }}
      >
        <div
          style={{
            padding: "9px",
            flexDirection: "row",
            right: "27%",
            top: "7%",
            display: "flex",
            position: "absolute",
            justifyContent: "center",
            alignItems: "center",
            maxHeight: "5vh",
            width: "50%",
          }}
        >
          <button
            className={
              pressedButton === "statusreports" ? "pressed-tab" : "tab-button"
            }
            onClick={() => handleClick(`statusreports`)}
          >
            <Icon icon="material-symbols:medical-information-outline-rounded" />
            &nbsp; דוחות מצב
          </button>

          <button
            className={
              pressedButton === "intervals" ? "pressed-tab" : "tab-button"
            }
            onClick={() => handleClick(`intervals`)}
          >
            <Icon icon="fa-solid:laptop-medical" />
            &nbsp; אינטרוולים
          </button>

          <button
            className={
              pressedButton === "injuries" ? "pressed-tab" : "tab-button"
            }
            onClick={() => handleClick(`injuries`)}
          >
            <Icon icon="uil:medical-square" />
            &nbsp; נפגעים מאירועים
          </button>
        </div>
      </div>
      <Outlet />
    </>
  );
}

export default Refua;
