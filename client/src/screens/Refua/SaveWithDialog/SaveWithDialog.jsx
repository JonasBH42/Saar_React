import { useState } from "react";
import { useMutation } from "react-query";
import { useForm } from "react-hook-form";
import { Icon } from "@iconify/react/dist/offline";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import { getFailureSwal, getSuccessSwal } from "@services";
import { refuaFormSchema as schema } from "@constants/formSchemas";
import { FormField } from "@components";

function SaveWithDialog({
  path,
  onSuccess,
  tableData,
  reportData = {},
  type,
  disabled,
  keyName,
  method = "POST",
}) {
  const [open, setOpen] = useState(false);
  const { register, handleSubmit, control, reset } = useForm();

  const onSaveSuccess = () => {
    getSuccessSwal('הדו"ח נשמר בהצלחה');
    reset();
  };

  const onSaveError = () => {
    getFailureSwal(
      'אירעה שגיאה, שימו לב ששם הדו"ח הוזן ללא תווים מיוחדים ותזמון השליחה הוזן'
    );
  };

  const { mutate, isLoading } = useMutation({
    onSuccess: () => {
      onSuccess && onSuccess();
      onSaveSuccess();
    },
    onError: () => {
      onSaveError();
    },
  });
  const handleSave = (data) => {
    mutate({
      method: method,
      path,
      data: { ...data, type, [keyName]: tableData },
    });
  };

  return (
    <>
      <IconButton
        className="control-icon"
        sx={{ backgroundColor: "#D9F6C8" }}
        onClick={() => setOpen(true)}
        disabled={disabled}
      >
        <Icon
          icon="mdi:content-save"
          color={disabled ? "#D9F6C8" : "84A771"}
          fontSize="30px"
        />
      </IconButton>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <form onSubmit={handleSubmit(handleSave)}>
          <DialogTitle id="alert-dialog-title">שלח דו"ח</DialogTitle>
          <DialogContent>
            {schema.map((row, index) => (
              <div key={`mulformRow_${index}`} style={{ display: "flex" }}>
                {Object.values(row).map((input) => (
                  <FormField
                    key={`formField_${input.key}`}
                    obj={input}
                    control={control}
                    register={register}
                    defaultValue={reportData[input.key]}
                  />
                ))}
              </div>
            ))}
          </DialogContent>
          <DialogActions>
            <IconButton
              className="control-icon"
              sx={{ backgroundColor: "#D9F6C8" }}
              type="submit"
            >
              <Icon icon="mdi:content-save" color="84A771" fontSize="30px" />
              {isLoading && <p>טוען...</p>}
            </IconButton>
            <IconButton
              className="control-icon"
              sx={{ backgroundColor: "#FEF2F3" }}
              onClick={() => setOpen(false)}
            >
              <Icon icon="mdi:close" color="AD1F19" fontSize="30px" />
            </IconButton>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}

export default SaveWithDialog;
