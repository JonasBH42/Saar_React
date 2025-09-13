import { React } from "react";
import { Link } from "react-router-dom";
import { IconButton } from "@mui/material";
import { Icon } from "@iconify/react/dist/offline";

function ExcelButton({ link = "" }) {
  return (
    <Link to={link}>
      <IconButton className="control-icon" sx={{ backgroundColor: "#D9F6C8" }}>
        <Icon icon="mdi:microsoft-excel" color="84A771" fontSize="30px" />
      </IconButton>
    </Link>
  );
}

export default ExcelButton;
