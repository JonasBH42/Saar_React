import { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Tooltip,
} from "@mui/material";
import { GridActionsCellItem } from "@mui/x-data-grid-pro";
import { VisibilityOutlined } from "@mui/icons-material";
import { useQuery } from "react-query";
import moment from "moment";
import { IconButton } from "@mui/material";
import { Icon } from "@iconify/react/dist/offline";
import { INPUT_TYPES } from "@constants";
import "./ViewDialogButton.css";

const infoFields = (type, value) => {
  if (type === INPUT_TYPES.date) {
    return value && moment(value).format("HH:mm DD.MM.YYYY");
  }
  if (type === INPUT_TYPES.dropDown && value != null) {
    return value?.Name;
  }
  if (type === INPUT_TYPES.checkbox) {
    return value ? "כן" : "לא";
  }
  return value;
};

function ViewDialogButton({ path, uid, schema }) {
  const [open, setOpen] = useState(false);
  const { data } = useQuery(path, {
    enabled: open,
    select: (data) => ({ ...data.find((e) => e.uid === uid) }),
  });

  function isEmpty(value) {
    return value == null || value.length === 0;
  }

  return (
    <div>
      <GridActionsCellItem
        icon={
          <Tooltip title="צפייה באירוע">
            <VisibilityOutlined />
          </Tooltip>
        }
        onClick={() => setOpen(true)}
        label="צפייה"
      />
      {open && (
        <Dialog open={open} onClose={() => setOpen(false)}>
          <div
            style={{
              display: "flex",
              flexDirection: "row-reverse",
              justifyContent: "space-between",
              paddingLeft: "20px",
              alignItems: "baseline",
            }}
          >
            <IconButton
              className="close-dialog"
              onClick={() => setOpen(false)}
              autoFocus
            >
              <Icon icon="mdi:close" color="AD1F19" fontSize="30px" />
            </IconButton>
            <DialogTitle>פרטי האירוע: </DialogTitle>
          </div>
          <DialogContent className="dialog-content">
            {schema.map((row, index) => (
              <div key={`${index}`} className="dialog-data">
                {Object.values(row).map(
                  (input) =>
                    !isEmpty(data[input.key]) &&
                    !input.hideField && (
                      <div key={`info_${input.key}`}>
                        <div
                          className="label-dialog"
                          style={{
                            padding: "3px",
                            justifyContent: "space-between",
                          }}
                        >
                          {input.label}:
                        </div>
                        <div
                          className="info-dialog"
                          style={{
                            padding: "3px",
                            justifyContent: "space-between",
                          }}
                        >
                          {infoFields(input.type, data[input.key])}
                        </div>
                      </div>
                    )
                )}
              </div>
            ))}
          </DialogContent>

          <DialogActions
            sx={{
              justifyContent: "space-between",
              paddingLeft: "20px",
              paddingRight: "20px",
              paddingBottom: "10px",
            }}
          ></DialogActions>
        </Dialog>
      )}
    </div>
  );
}
export default ViewDialogButton;
