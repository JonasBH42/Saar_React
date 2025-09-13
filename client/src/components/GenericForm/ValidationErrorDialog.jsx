import { DialogActions, DialogTitle, Dialog, Button } from "@mui/material";
import "./GenericForm/GenericForm.css";

const VALIDATION_ERR_TITLE = "אוי, יש בעיה!";
const VALIDATION_ERR_MSG =
  "לפני שנוכל לשלוח את הנתונים צריך לתקן את השדות הבאים:";

export function ValidationErrorDialog({
  errors,
  isOpened,
  setIsValidationWindowOpened,
}) {
  return (
    <Dialog
      bounds="body"
      open={isOpened}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle variant={"h4"}>{VALIDATION_ERR_TITLE}</DialogTitle>

      <DialogTitle variant={"h6"}>{VALIDATION_ERR_MSG}</DialogTitle>
      <hr width="90%" />
      {Object.keys(errors).map((error) => (
        <div key={error} style={{ paddingBottom: "5px", paddingRight: "10%" }}>
          {errors[error]?.message}
        </div>
      ))}
      <DialogActions
        sx={{
          justifyContent: "center",
        }}
      >
        <Button
          variant="outlined"
          onClick={() => setIsValidationWindowOpened(false)}
        >
          אישור
        </Button>
      </DialogActions>
    </Dialog>
  );
}
