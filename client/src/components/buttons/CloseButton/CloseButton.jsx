import { React } from "react";
import { Link } from "react-router-dom";
import { IconButton } from "@mui/material";
import { Icon } from "@iconify/react/dist/offline";

function CloseButton({ closeLink = "" }) {
  return (
    <Link to={closeLink}>
      <IconButton className="control-icon" sx={{ backgroundColor: "#FEF2F3" }}>
        <Icon icon="mdi:close" color="AD1F19" fontSize="30px" />
      </IconButton>
    </Link>
  );
}

export default CloseButton;
