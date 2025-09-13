import { React } from "react";
import { Link } from "react-router-dom";
import { IconButton } from "@mui/material";
import { Icon } from "@iconify/react/dist/offline";

function AddButton({ link = "" }) {
  return (
    <Link to={link}>
      <IconButton className="control-icon">
        <Icon icon="mdi:plus" fontSize="30px" />
      </IconButton>
    </Link>
  );
}

export default AddButton;
