import moment from "moment";
import { Edit } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";
import { CellWithToolTip, DeleteWithDialog, Lonk } from "@components";

const HEADER_ALIGN = "center";
const COLUMN_WIDTH = 200;

export const reportColumns = (api, refetch) => {
  const reportActions = {
    field: "actions",
    type: "actions",
    width: 150,
    getActions: (params) => [
      <Lonk
        to={`reports/${params.row.type}/${params.id}`}
        style={{
          pointerEvents: params.row.acceptedByDestinationAt ? "none" : "",
        }}
      >
        <IconButton
          size="small"
          disabled={params.row.acceptedByDestinationAt ? true : false}
        >
          <Tooltip title="עריכת דוח">
            <Edit />
          </Tooltip>
        </IconButton>
      </Lonk>,
      <DeleteWithDialog
        onSuccess={refetch}
        path={`${api}/reports/${params.id}`}
      />,
    ],
  };

  return [
    {
      field: "reportName",
      headerName: "שם דוח",
      width: COLUMN_WIDTH,
      headerAlign: HEADER_ALIGN,
      renderCell: (params) => <CellWithToolTip {...params} />,
    },
    {
      field: "sendTimeScheduledAt",
      headerName: "תזמון שליחה",
      width: COLUMN_WIDTH,
      headerAlign: HEADER_ALIGN,
      valueFormatter: ({ value }) =>
        value && moment(value).format("HH:mm DD.MM.YYYY"),
      type: "dateTime",
    },
    reportActions,
  ];
};
