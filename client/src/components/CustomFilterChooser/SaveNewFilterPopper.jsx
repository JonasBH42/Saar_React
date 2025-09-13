import {
  Button,
  TextField,
  InputLabel,
  ClickAwayListener,
  Popper,
} from "@mui/material";
import { gridFilterModelSelector } from "@mui/x-data-grid-pro";
import { getFailureSwal, getSuccessSwal } from "@services";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";

function SaveNewFilterPopper({
  apiRef,
  refetch,
  createNewFilterPopper,
  setCreateNewFilterPopper,
  path,
}) {
  const constructFilterForInsert = (name, filter) => {
    return filter.items.map(({ id, columnField, operatorValue, value }) => {
      return {
        name,
        id: parseInt(id),
        columnField,
        operatorValue,
        value,
      };
    });
  };

  const onSaveSuccess = () => {
    getSuccessSwal("הסנן נשמר בהצלחה!");
    refetch();
  };

  const onSaveError = () => {
    getFailureSwal("חלה שגיאה בשמירת הסנן, נסו שוב");
  };

  const { mutate } = useMutation({
    onSuccess: onSaveSuccess,
    onError: onSaveError,
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = ({ name }) => {
    setCreateNewFilterPopper(false);
    const filter = constructFilterForInsert(
      name,
      gridFilterModelSelector(apiRef)
    );
    mutate({ method: "POST", path: path, data: { filter } });
    reset();
  };

  const handleClickAwayNewFilter = () => {
    setCreateNewFilterPopper(false);
  };

  return (
    <Popper
      open={Boolean(createNewFilterPopper)}
      anchorEl={createNewFilterPopper}
      disablePortal
      sx={{
        backgroundColor: "white",
        padding: "10px",
        borderRadius: "10px",
        border: "1px solid #CCCCCC",
        zIndex: 2000,
        boxShadow:
          "0px 5px 5px -3px rgb(0 0 0 / 20%), 0px 8px 10px 1px rgb(0 0 0 / 14%), 0px 3px 14px 2px rgb(0 0 0 / 12%);",
      }}
    >
      <ClickAwayListener onClickAway={handleClickAwayNewFilter}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <InputLabel>שם הסנן החדש:</InputLabel>
          <TextField
            {...register("name", { required: true })}
            margin="dense"
            type="text"
            sx={{
              input: { textAlign: "center", fontSize: "20px" },
              backgroundColor: "white",
            }}
          />
          <div style={{ paddingBottom: "10px" }}>
            {errors.name && (
              <span style={{ color: "red" }}>יש להזין שם לסנן</span>
            )}
          </div>
          <Button
            variant="outlined"
            sx={{
              backgroundColor: "#BAE7F0",
              color: "black",
              fontWeight: "bold",
              border: "solid #C1DCE1 1px",
            }}
            type="submit"
          >
            שמור
          </Button>
        </form>
      </ClickAwayListener>
    </Popper>
  );
}
export default SaveNewFilterPopper;
