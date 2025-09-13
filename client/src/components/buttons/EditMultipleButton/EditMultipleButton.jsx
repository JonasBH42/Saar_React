import { useState } from "react";
import { useMutation } from "react-query";
import { useForm } from "react-hook-form";
import {
  IconButton,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  Button,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import { Edit } from "@mui/icons-material";
import { Icon } from "@iconify/react/dist/offline";
import { FormField } from "@components";
import { INPUT_TYPES } from "@constants";
import { getFailureSwal, getSuccessSwal } from "@services";
import "./EditMultipleButton.css";

function CategoryDropdown({ formOptions, schema, route, unregister }) {
  const [category, setCategory] = useState("");

  const handleChange = (event) => {
    unregister(category);
    setCategory(event.target.value);
  };

  return (
    <>
      <div>
        <InputLabel id="select-label">בחרו קטגוריה</InputLabel>
        <Select
          fullWidth
          id="select"
          value={category}
          onChange={handleChange}
          required={true}
        >
          {Object.values(schema)
            .filter(
              (row) => !row.isDisabled && row.type !== INPUT_TYPES.stateOriented
            )
            .map((row) => (
              <MenuItem key={row.key} value={row.key}>
                {row.label}
              </MenuItem>
            ))}
        </Select>
      </div>

      {category && (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-evenly",
            marginBottom: "15px",
          }}
        >
          <FormField obj={schema[category]} route={route} {...formOptions} />
        </div>
      )}
    </>
  );
}

function EditMultipleButton({ path, onSuccess, identifierList, schema }) {
  const [open, setOpen] = useState(false);

  const onSaveSuccess = () => {
    getSuccessSwal("העדכון נשמר בהצלחה");
    handleClose();
  };

  const onSaveError = () => {
    getFailureSwal("אירעה תקלה בעדכון, נסו שוב");
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { register, handleSubmit, control, setValue, unregister } = useForm();

  const { mutate, isLoading } = useMutation({
    onSuccess: () => {
      onSuccess();
      onSaveSuccess();
    },
    onError: onSaveError,
  });

  const onTimingSubmit = (data) => {
    mutate({
      method: "PUT",
      path: `${path}/multiple`,
      data: { uids: identifierList, fields: data },
    });
  };

  const toggleDisableMultiple = (newValue) => {
    mutate({
      method: "PUT",
      path: `${path}/multiple`,
      data: { uids: identifierList, fields: { isDisabled: newValue } },
    });
  };

  return (
    <>
      <IconButton className="control-icon" onClick={handleClickOpen}>
        <Edit />
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <form onSubmit={handleSubmit(onTimingSubmit)}>
          {path === "events" && (
            <>
              <DialogTitle sx={{ textAlign: "center" }}>
                פעולות מהירות:
              </DialogTitle>
              <DialogContent
                sx={{
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Button
                  variant="contained"
                  onClick={() => toggleDisableMultiple(false)}
                  label="enable"
                >
                  אפשר שליחה לשועל
                </Button>
                <Button
                  variant="contained"
                  onClick={() => toggleDisableMultiple(true)}
                  label="disable"
                >
                  השהה שליחה לשועל
                </Button>
              </DialogContent>
            </>
          )}
          <DialogTitle sx={{ textAlign: "center" }}>
            עדכן ערך עבור האירועים הנבחרים:
          </DialogTitle>
          <DialogContent>
            <CategoryDropdown
              formOptions={{
                control,
                register,
                setFieldValue: setValue,
              }}
              schema={schema}
              route={path}
              unregister={unregister}
            />
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
              onClick={handleClose}
            >
              <Icon icon="mdi:close" color="AD1F19" fontSize="30px" />
            </IconButton>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}

export default EditMultipleButton;
