import { useState } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
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

const API_ROUTE = MODULES_ROUTES.refua;
const HOSPITAL_NAMES_ROUTE = `${MODULES_ROUTES.refua}/hospitalNames`;
const TITLE = "טופס דוח נקלטים במלרד";

function MalradForm({ isOnEditMode = true, closeLink }) {
  const [malradData, setMalradData] = useState([]);
  const navigate = useNavigate();

  const { isLoading } = useQuery(HOSPITAL_NAMES_ROUTE, {
    select: (data) =>
      data.map((hospital) => {
        return {
          id: hospital.id,
          hospitalName: hospital.name,
          district: hospital.hfcDistrict?.name,
        };
      }),
    onSuccess: (data) => {
      setMalradData(data);
    },
  });

  const resetTable = () => {
    setMalradData((prev) => [
      ...resetObjectsValues(prev, ["id", "hospitalName", "district"]),
    ]);
  };

  if (isLoading || !malradData.length) return <LoadingIndicator />;
  return (
    <div style={{ display: "flex", flexDirection: "column", padding: "30px" }}>
      <div className={"header"}>
        <span className={"headline"}>{TITLE}</span>
        <div>
          <SaveWithDialog
            path={`${API_ROUTE}/reports`}
            tableData={malradData}
            type={"malrad"}
            keyName={"edSnapshotsData"}
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
          localeText={heIL.components.MuiDataGrid.defaultProps.localeText}
          rows={malradData}
          columns={malradTableColumns(isOnEditMode)}
          onCellEditCommit={(params) => {
            setMalradData(enterCellValueToData(malradData, params));
          }}
          hideFooter
        />
      </Box>
    </div>
  );
}

export default MalradForm;
