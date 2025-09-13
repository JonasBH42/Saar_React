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
import {
  bedsTableColumns,
  columnGroupingModel,
} from "./TableColumns/bedsColumns";
import "@styles/mui-datagrid.css";
import "@styles/main-page.css";

const API_ROUTE = MODULES_ROUTES.refua;
const HOSPITAL_NAMES_ROUTE = `${MODULES_ROUTES.refua}/hospitalNames`;
const TITLE = "טופס דוח מיטות קריטיות";

function CritBedsForm({ isOnEditMode = true, closeLink }) {
  const [bedsData, setBedsData] = useState([]);
  const navigate = useNavigate();

  const { isLoading } = useQuery(HOSPITAL_NAMES_ROUTE, {
    select: (data) =>
      data.map((hospital) => {
        return {
          id: hospital.id,
          hospitalName: hospital.name,
          district: hospital.hfcDistrict?.name,
          totalNeurosurgery:
            hospital.criticalBedsStatic?.totalNeurosurgery ?? 0,
          totalOperatingRooms:
            hospital.criticalBedsStatic?.totalOperatingRooms ?? 0,
          totalIcuChildren: hospital.criticalBedsStatic?.totalIcuChildren ?? 0,
          totalIcuAdult: hospital.criticalBedsStatic?.totalIcuAdult ?? 0,
          totalEmergencyDepartments:
            hospital.criticalBedsStatic?.totalEmergencyDepartments ?? 0,
          totalTraumaBeds: hospital.criticalBedsStatic?.totalTraumaBeds ?? 0,
          totalOrthopedics: hospital.criticalBedsStatic?.totalOrthopedics ?? 0,
          totalSurgery: hospital.criticalBedsStatic?.totalSurgery ?? 0,
        };
      }),
    onSuccess: (data) => {
      setBedsData(data);
    },
  });

  const resetTable = () => {
    setBedsData((prev) => [
      ...resetObjectsValues(prev, [
        "id",
        "hospitalName",
        "district",
        "totalNeurosurgery",
        "totalOperatingRooms",
        "totalIcuChildren",
        "totalIcuAdult",
        "totalTraumaBeds",
        "totalEmergencyDepartments",
        "totalOrthopedics",
        "totalSurgery",
      ]),
    ]);
  };

  if (isLoading || !bedsData.length) return <LoadingIndicator />;
  return (
    <div style={{ display: "flex", flexDirection: "column", padding: "30px" }}>
      <div className={"header"}>
        <span className={"headline"}>{TITLE}</span>
        <div>
          <SaveWithDialog
            path={`${API_ROUTE}/reports`}
            tableData={bedsData}
            type={"beds"}
            keyName={"criticalBedsData"}
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
          rows={bedsData}
          columns={bedsTableColumns(isOnEditMode)}
          columnGroupingModel={columnGroupingModel}
          onCellEditCommit={(params) => {
            setBedsData(enterCellValueToData(bedsData, params));
          }}
          hideFooter
        />
      </Box>
    </div>
  );
}

export default CritBedsForm;
