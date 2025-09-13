import * as React from "react";
import { styled } from "@mui/system";
import { MaofLogo, PakarLogo, TikshuvLogo } from "@assets/images";

function AppBottom() {
  return (
    <div
      style={{
        marginTop: "auto",
        width: "100%",
        alignSelf: "center",
        alignItems: "center",
        flexDirection: "column",
        display: "flex",
        justifyItems: "center",
        marginBottom: "20px",
      }}
    >
      <div style={{ color: "#60c7d6", fontSize: "12px" }}>
        כל הזכויות שמורות לצוות סער מדור שלדג
      </div>
      <Logos />
    </div>
  );
}

function Logos() {
  const Logo = styled("img")({
    width: "31px",
    height: "31px",
    transition: "all 0.3s ease 0s",
    "&:hover": {
      transform: "scale(1.25) rotate(360deg)",
    },
  });

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        marginLeft: "10px",
      }}
    >
      <Logo
        src={MaofLogo}
        alt="Maof"
        style={{ width: "40px", height: "31px" }}
      />
      <Logo src={TikshuvLogo} alt="Tiksuv" />
      <Logo src={PakarLogo} alt="Pakar" />
    </div>
  );
}

export default AppBottom;
