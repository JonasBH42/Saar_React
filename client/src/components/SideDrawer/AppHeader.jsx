import * as React from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { Icon } from "@iconify/react/dist/offline";
import { IconButton } from "@mui/material";
import { Logout } from "@mui/icons-material";
import { ENV_COOKIE_NAME } from "@environment";
import { queryClient } from "src";

function AppHeader() {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <div>
        <Icon
          style={{ fontSize: "30px", marginRight: "15px" }}
          color="#60c7d6"
          icon="bi:lightning-charge-fill"
        />
        <Link to={""} style={{ textDecoration: "none" }}>
          <span
            style={{
              fontStyle: "italic",
              color: "#ad1f19",
              fontSize: "38px",
              marginRight: "20px",
            }}
          >
            סער
          </span>
        </Link>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <LogoutButton />
      </div>
    </div>
  );
}

function LogoutButton() {
  const fetchEnvText = (env) => `${JSON.parse(Cookies.get(env)).header}`;

  const logoutCleaning = () => {
    queryClient.clear();
    localStorage.clear();
    Cookies.remove(ENV_COOKIE_NAME);
  };

  return (
    <div
      style={{
        border: "1px solid rgba(0, 0, 0, 0.12)",
        borderRadius: "8%",
        marginLeft: "35px",
      }}
    >
      <span
        style={{ fontStyle: "david", fontSize: "15px", marginRight: "15px" }}
      >
        {fetchEnvText(ENV_COOKIE_NAME)}
      </span>
      <Link to={"/"} style={{ textDecoration: "none" }}>
        <IconButton sx={{ color: "red" }} onClick={logoutCleaning}>
          <Logout />
        </IconButton>
      </Link>
    </div>
  );
}

export default AppHeader;
