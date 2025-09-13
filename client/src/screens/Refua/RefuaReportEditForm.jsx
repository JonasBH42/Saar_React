import { useState } from "react";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { Box } from "@mui/material";
import { DataGridPro, heIL } from "@mui/x-data-grid-pro";
import { ExitWithDialog, LoadingIndicator } from "@components";
import { MODULES_ROUTES } from "@constants";
import SaveWithDialog from "./SaveWithDialog/SaveWithDialog";
import ResetButtonWithDialog from "./ResetButtonWithDialog/ResetButtonWithDialog";
import { enterCellValueToData, resetObjectsValues } from "./services";
import { malradTableColumns } from "./TableColumns/malradColumns";
import "@styles/mui-datagrid.css";
import "@styles/main-page.css";
import {
  bedsTableColumns,
  columnGroupingModel,
} from "./TableColumns/bedsColumns";

const API_ROUTE = MODULES_ROUTES.refua;
const TITLE = "עריכת דוח";

function RefuaReportEditForm({ isOnEditMode = true, closeLink, type }) {
  const [reportData, setReportData] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  const dataPath = type === "malrad" ? "edSnapshotsData" : "criticalBedsData";

  const { data, isLoading } = useQuery(`refua/reports/${type}/${id}`, {
    select: (data) => data[0],
    onSuccess: (data) => {
      setReportData(data[dataPath]);
    },
  });

  const resetTable = () => {
    setReportData((prev) => [
      ...resetObjectsValues(prev, ["id", "hospitalName", "district"]),
    ]);
  };

  if (isLoading || !reportData.length) return <LoadingIndicator />;
  return (
    <div style={{ display: "flex", flexDirection: "column", padding: "30px" }}>
      <div className={"header"}>
        <span className={"headline"}>
          {TITLE}-{data.reportName}
        </span>
        <div>
          <SaveWithDialog
            path={`${API_ROUTE}/reports/${id}`}
            method="PUT"
            reportData={{
              reportName: data.reportName,
              sendTimeScheduledAt: data.sendTimeScheduledAt,
            }}
            tableData={reportData}
            disabled={!!data.acceptedByDestinationAt}
            type={type}
            keyName={dataPath}
            onSuccess={() => navigate(closeLink)}
          />
          <ResetButtonWithDialog action={resetTable} disabled={!isOnEditMode} />
          <ExitWithDialog closeLink={closeLink} />
        </div>
      </div>
      <Box
        sx={{
          height: "76vh",
          ".MuiDataGrid-virtualScroller": {
            overflow: "auto",
          },
        }}
      >
        <DataGridPro
          disableColumnResize
          experimentalFeatures={{ columnGrouping: true }}
          localeText={heIL.components.MuiDataGrid.defaultProps.localeText}
          rows={reportData}
          columns={
            type === "malrad"
              ? malradTableColumns(isOnEditMode)
              : bedsTableColumns(isOnEditMode)
          }
          columnGroupingModel={columnGroupingModel}
          dataKey={"uid"}
          identifierKey={"uid"}
          onCellEditCommit={(params) => {
            setReportData(enterCellValueToData(reportData, params));
          }}
          hideFooter
        />
      </Box>
    </div>
  );
}

export default RefuaReportEditForm;
