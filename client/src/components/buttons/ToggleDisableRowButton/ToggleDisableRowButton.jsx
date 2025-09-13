import { useState } from "react";
import { Alert, IconButton, Stack, Snackbar, Tooltip } from "@mui/material";
import { PendingOutlined, PauseRounded } from "@mui/icons-material";
import { useMutation } from "react-query";

function ToggleDisableRowButton({
  path,
  onSuccess,
  disableToggle,
  currentisDisabledValue,
  uid,
}) {
  const [open, setOpen] = useState(false);
  const { mutate, isLoading } = useMutation({
    onSuccess,
    onError: () => setOpen(true),
  });

  const handleDisable = () => {
    mutate({
      method: "PUT",
      path,
      data: { uid, isDisabled: !currentisDisabledValue },
    });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const toggleDisableIcon = () => {
    if (isLoading) {
      return <PendingOutlined />;
    } else {
      return (
        <Tooltip
          title={
            !currentisDisabledValue
              ? "השהה את השליחה לשועל"
              : "אשר את השליחה לשועל"
          }
        >
          <PauseRounded />
        </Tooltip>
      );
    }
  };

  return (
    <Stack spacing={2} sx={{ width: "100%" }}>
      <IconButton onClick={handleDisable} size="small" disabled={disableToggle}>
        {toggleDisableIcon()}
      </IconButton>
      <Snackbar
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={2500}
      >
        <Alert
          severity="error"
          sx={{
            width: "100%",
            "& .MuiAlert-message": {
              paddingInline: 1,
              fontFamily: "Open Sans, sans-serif",
            },
            "& .MuiAlert-icon": {
              marginRight: 0,
            },
          }}
        >
          הייתה בעיה בכיבוי/הדלקת האירוע, נסו שוב
        </Alert>
      </Snackbar>
    </Stack>
  );
}

export default ToggleDisableRowButton;
