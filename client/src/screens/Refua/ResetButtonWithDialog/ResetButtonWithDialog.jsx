import { useState } from "react";
import { Dialog, DialogActions, DialogTitle, IconButton } from "@mui/material";
import { Icon } from "@iconify/react/dist/offline";

function ResetButtonWithDialog({ action, disabled }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <IconButton
        className="control-icon"
        sx={{ backgroundColor: "#FEF2F3" }}
        onClick={() => setOpen(true)}
        disabled={disabled}
      >
        <Icon
          icon="carbon:reset"
          color={disabled ? "#FEF2F1" : "AD1F19"}
          fontSize="30px"
        />
      </IconButton>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          ?האם אתם בטוחים שתרצו לאפס את הטבלה
        </DialogTitle>
        <DialogActions>
          <IconButton
            className="control-icon"
            sx={{ backgroundColor: "#D9F6C8" }}
            type="submit"
            onClick={() => {
              setOpen(false);
              action();
            }}
          >
            <Icon icon="carbon:reset" color="84A771" fontSize="30px" />
          </IconButton>
          <IconButton
            className="control-icon"
            sx={{ backgroundColor: "#FEF2F3" }}
            onClick={() => setOpen(false)}
          >
            <Icon icon="mdi:close" color="AD1F19" fontSize="30px" />
          </IconButton>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default ResetButtonWithDialog;
