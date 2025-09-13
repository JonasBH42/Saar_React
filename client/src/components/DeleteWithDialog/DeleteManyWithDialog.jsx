import { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  IconButton,
} from "@mui/material";
import { useMutation } from "react-query";
import { Delete } from "@mui/icons-material";

function ConfirmMultipleDelete({ path, onSuccess, disabled, identifierList }) {
  const [open, setOpen] = useState(false);

  const { mutate } = useMutation({ onSuccess });

  const handleDelete = () => {
    setOpen(false);
    mutate({
      method: "DELETE",
      path: `${path}/bulk`,
      data: { uids: identifierList },
    });
  };

  return (
    <div>
      <IconButton
        className="control-icon"
        onClick={() => setOpen(true)}
        disabled={disabled}
        label="Delete"
      >
        <Delete />
      </IconButton>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          האם אתם בטוחים שתרצו למחוק את הרשומות שנבחרו?
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

export default ConfirmMultipleDelete;
