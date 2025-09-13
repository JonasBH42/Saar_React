import { useState } from "react";
import _ from "lodash";
import {
  Button,
  Select,
  MenuItem,
  Typography,
  FormControl,
  OutlinedInput,
} from "@mui/material";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import { gridFilterModelSelector } from "@mui/x-data-grid-pro";
import { Icon } from "@iconify/react/dist/offline";
import { REFETCHING_INTERVAL } from "@constants";
import SaveNewFilterPopper from "./SaveNewFilterPopper";

const API_ROUTE = "customFilters";

function CustomFilterChooser({ apiRef }) {
  const { data, refetch } = useQuery(API_ROUTE, {
    refetchInterval: REFETCHING_INTERVAL,
  });

  const [createNewFilterPopper, setCreateNewFilterPopper] = useState(null);

  const handleClickCreate = (event) => {
    if (gridFilterModelSelector(apiRef).items.length > 0)
      setCreateNewFilterPopper(
        createNewFilterPopper ? null : event.currentTarget
      );
    else {
      toast("הוסיפו סננים על מנת לשמור סינון חדש", {
        draggablePercent: 10,
        position: "top-center",
        autoClose: 2500,
        closeOnClick: true,
        hideProgressBar: false,
        pauseOnHover: true,
        draggable: true,
        rtl: true,
        type: "info",
      });
    }
  };

  const setFiltersInTable = (selectedFilters) =>
    apiRef.current.upsertFilterItems(
      data
        .filter((element) => selectedFilters.includes(element.filterId))
        .map((item) =>
          _.pick(item, ["id", "columnField", "operatorValue", "value"])
        )
    );

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        border: "1px solid #CCCCCC",
        borderRadius: "5px",
        alignItems: "center",
        padding: "5px",
        paddingInline: "10px",
      }}
    >
      <Typography variant="h6" component="div">
        סננים שמורים
      </Typography>
      <MultipleSelect
        data={data}
        apiRef={apiRef}
        onSelectFunc={setFiltersInTable}
      />
      <FilterChooserBtn
        label="ניהול סננים"
        color="#FBF3B0"
        iconName="mdi:cog"
      />
      <FilterChooserBtn
        label="שמור סנן"
        color="#C2EAF0"
        iconName="mdi:content-save"
        onClick={handleClickCreate}
      />
      <SaveNewFilterPopper
        apiRef={apiRef}
        refetch={refetch}
        createNewFilterPopper={createNewFilterPopper}
        setCreateNewFilterPopper={setCreateNewFilterPopper}
        path={API_ROUTE}
      />
    </div>
  );
}

function MultipleSelect({ data, onSelectFunc }) {
  const [selectedItems, setSelectedItems] = useState([]);

  const handleChange = (change) => {
    const {
      target: { value },
    } = change;
    setSelectedItems(value);
    onSelectFunc(value);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 180 }}>
        <Select
          id="multiple-select"
          multiple
          value={selectedItems}
          onChange={handleChange}
          input={<OutlinedInput size="small" />}
          inputProps={{ "aria-label": "Without label" }}
          MenuProps={{ PaperProps: { sx: { maxHeight: 300 } } }}
        >
          {[
            ...new Map(data?.map((item) => [item.filterId, item])).values(),
          ].map(({ filterId, id, name }) => (
            <MenuItem key={`${id}_${filterId}`} value={filterId}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

function FilterChooserBtn({ label, color, iconName, onClick = () => {} }) {
  return (
    <Button
      onClick={onClick}
      variant="contained"
      startIcon={
        <Icon
          icon={iconName}
          color="#939393"
          style={{ paddingLeft: "10px", paddingRight: "unset !important" }}
        />
      }
      sx={{
        backgroundColor: `${color} !important`,
        color: "#999999 !important",
        boxShadow: "none",
        border: "1px solid #CCCCCC",
        borderRadius: "5px",
        ".css-1d6wzja-MuiButton-startIcon": {
          marginRight: "unset",
        },
        paddingInline: "7px",
        marginInline: "5px",
      }}
    >
      {label}
    </Button>
  );
}

export default CustomFilterChooser;
