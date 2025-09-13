import { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Tooltip,
} from "@mui/material";
import { GridActionsCellItem } from "@mui/x-data-grid-pro";
import { Delete } from "@mui/icons-material";
import { useMutation } from "react-query";

function ConfirmDelete({ path, onSuccess, disabled }) {
  const [open, setOpen] = useState(false);

  const { mutate } = useMutation({ onSuccess });

  const handleDelete = () => {
    setOpen(false);
    mutate({ method: "DELETE", path });
  };

  return (
    <div>
      <GridActionsCellItem
        icon={
          <Tooltip title="מחיקת רשומה">
            <Delete />
          </Tooltip>
        }
        onClick={() => setOpen(true)}
        label="Delete"
        disabled={disabled}
      />
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          האם אתם בטוחים שתרצו למחוק את השורה?
        </DialogTitle>
        <DialogActions
          sx={{
            justifyContent: "space-between",
            paddingLeft: "20px",
            paddingRight: "20px",
            paddingBottom: "10px",
          }}
        >
          <Button variant="outlined" onClick={() => setOpen(false)} autoFocus>
            ביטול
          </Button>
          <Button
            variant="outlined"
            color="error"
            onClick={handleDelete}
            autoFocus
          >
            מחק
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ConfirmDelete;
