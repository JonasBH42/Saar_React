import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  IconButton,
} from "@mui/material";
import { Icon } from "@iconify/react/dist/offline";

const ARE_U_SURE_MSG = "האם תרצו לצאת בלי לשמור את הנתונים?";

function ConfirmExit({
  closeLink,
  isDirty,
  isSubmitted,
  children,
  resetExpanded,
}) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const navigate = useNavigate();

  const navigateFunction = () => {
    navigate(closeLink);
    resetExpanded && resetExpanded();
  };

  const handleExit = () => {
    isDirty && !isSubmitted ? setIsDialogOpen(true) : navigateFunction();
  };

  return (
    <>
      {(children && children(handleExit)) || (
        <IconButton
          onClick={handleExit}
          className="control-icon"
          sx={{ backgroundColor: "#FEF2F3" }}
        >
          <Icon icon="mdi:close" color="AD1F19" fontSize="30px" />
        </IconButton>
      )}

      <Dialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{ARE_U_SURE_MSG}</DialogTitle>
        <DialogActions
          sx={{
            justifyContent: "space-between",
            paddingLeft: "20px",
            paddingRight: "20px",
            paddingBottom: "10px",
          }}
        >
          <Button variant="outlined" onClick={() => setIsDialogOpen(false)}>
            ביטול
          </Button>
          <Link to={closeLink} style={{ textDecoration: "none" }}>
            <Button
              variant="outlined"
              color="error"
              onClick={() => {
                setIsDialogOpen(false);
                resetExpanded && resetExpanded();
              }}
              autoFocus
            >
              כן, צא
            </Button>
          </Link>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default ConfirmExit;
