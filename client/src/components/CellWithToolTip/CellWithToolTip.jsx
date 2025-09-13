import { Tooltip } from "@mui/material";

const CellWithToolTip = (params) => (
  <Tooltip title={params.value?.toString() ?? "tooltip"} placement="top">
    <span>{params.value?.toString()}</span>
  </Tooltip>
);

export default CellWithToolTip;
