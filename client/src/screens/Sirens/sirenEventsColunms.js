import moment from "moment";
import { Edit, ContentCopy } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";
import {
  CellWithToolTip,
  DeleteWithDialog,
  Lonk,
  ViewDialogButton,
} from "@components";
import { MODULES_ROUTES, SCREEN_ROUTES } from "@constants";
import { sirenEventsFormSchema } from "@constants/formSchemas";

const HEADER_ALIGN = "center";

const COLUMN_WIDTH = "150";

export const sirenEventsColumns = (api, refetch) => {
  const sirensAction = {
    field: "actions",
    type: "actions",
    width: 140,
    getActions: (params) => [
      <Lonk to={`${SCREEN_ROUTES.duplicate}/${params.id}`}>
        <IconButton size="small">
          <Tooltip title="העתקת אירוע">
            <ContentCopy />
          </Tooltip>
        </IconButton>
      </Lonk>,
      <ViewDialogButton
        path={MODULES_ROUTES.sirens}
        uid={params.id}
        schema={sirenEventsFormSchema}
      />,
      <Lonk
        to={params.id}
        style={{
          pointerEvents: params.row.acceptedByDestinationAt ? "none" : "",
        }}
      >
        <IconButton
          size="small"
          disabled={!!params.row.acceptedByDestinationAt}
        >
          <Tooltip title="עריכת אירוע">
            <Edit />
          </Tooltip>
        </IconButton>
      </Lonk>,
      <DeleteWithDialog onSuccess={refetch} path={`${api}/${params.id}`} />,
    ],
  };

  return [
    {
      field: "name",
      headerName: "שם",
      width: 200,
      headerAlign: HEADER_ALIGN,
      renderCell: (params) => <CellWithToolTip {...params} title="" />,
    },
    {
      field: "uid",
      headerName: "מזהה",
      width: COLUMN_WIDTH,
      headerAlign: HEADER_ALIGN,
    },
    {
      field: "sendTimeScheduledAt",
      headerName: "תזמון שליחה",
      valueFormatter: ({ value }) =>
        value && moment(value).format("HH:mm DD.MM.YYYY"),
      width: COLUMN_WIDTH,
      headerAlign: HEADER_ALIGN,
      type: "dateTime",
    },
    {
      field: "status",
      headerName: "סטטוס אירוע",
      width: COLUMN_WIDTH,
      headerAlign: HEADER_ALIGN,
      renderCell: (param) => (
        <div
          style={{
            color:
              param.value?.ID === 1
                ? "green"
                : param.value?.ID === 4
                ? "red"
                : "grey",
          }}
        >
          {param.value?.Name}
        </div>
      ),
    },
    {
      field: "acceptedByDestinationAt",
      headerName: "זמן קבלה בשועל",
      width: COLUMN_WIDTH,
      valueFormatter: ({ value }) =>
        value && moment(value).format("HH:mm DD.MM.YYYY"),
      headerAlign: HEADER_ALIGN,
      type: "dateTime",
    },
    {
      field: "workEnvironmentId",
      headerName: "מזהה סביבה",
      width: COLUMN_WIDTH,
      headerAlign: HEADER_ALIGN,
    },
    {
      field: "createdAt",
      headerName: "זמן היצירה",
      width: COLUMN_WIDTH,
      valueFormatter: ({ value }) =>
        value && moment(value).format("HH:mm DD.MM.YYYY"),
      headerAlign: HEADER_ALIGN,
      type: "dateTime",
    },
    {
      field: "updatedAt",
      headerName: "זמן עדכון",
      valueFormatter: ({ value }) =>
        value && moment(value).format("HH:mm DD.MM.YYYY"),
      width: COLUMN_WIDTH,
      headerAlign: HEADER_ALIGN,
      type: "dateTime",
    },
    {
      field: "relatedSirens",
      headerName: "MDLC",
      width: COLUMN_WIDTH,
      headerAlign: HEADER_ALIGN,
      renderCell: (params) => <CellWithToolTip {...params} title="" />,
    },
    sirensAction,
  ];
};

export const invisibleColumns = {
  uid: false,
  workEnvironmentId: false,
  updatedAt: false,
  acceptedByDestinationAt: false,
};
