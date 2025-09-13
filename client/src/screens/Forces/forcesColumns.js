import moment from "moment";
import { Edit, ContentCopy } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";
import { CellWithToolTip, DeleteWithDialog, Lonk } from "@components";
import { MODULES_ROUTES, SCREEN_ROUTES } from "@constants";
import { ViewDialogButton } from "@components";
import { forcesFormSchema } from "@constants/formSchemas";

const HEADER_ALIGN = "center";

export const forcesTableColumns = (api, refetch) => {
  const forcesAction = {
    field: "actions",
    type: "actions",
    width: 150,
    getActions: (params) => [
      <Lonk to={`${SCREEN_ROUTES.duplicate}/${params.id}`}>
        <IconButton size="small">
          <Tooltip title="העתקת כוח">
            <ContentCopy />
          </Tooltip>
        </IconButton>
      </Lonk>,
      <ViewDialogButton
        path={MODULES_ROUTES.forces}
        uid={params.id}
        schema={forcesFormSchema}
      />,
      <Lonk
        to={params.id}
        style={{
          pointerEvents: params.row.acceptedByDestinationAt ? "none" : "",
        }}
      >
        <IconButton
          size="small"
          disabled={params.row.acceptedByDestinationAt ? true : false}
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
      field: "FORCE_IP",
      headerName: "מזהה",
      width: 80,
      headerAlign: HEADER_ALIGN,
      renderCell: (params) => <CellWithToolTip {...params} />,
      type: "number",
    },
    {
      field: "FORCE_UNIT",
      headerName: "יחידת כוח",
      width: 90,
      headerAlign: HEADER_ALIGN,
      renderCell: (params) => <CellWithToolTip {...params} />,
    },
    {
      field: "FORCE_TYPE",
      headerName: "סוג כוח",
      width: 100,
      headerAlign: HEADER_ALIGN,
      renderCell: (params) => <CellWithToolTip {...params} />,
    },
    {
      field: "VEHICLE_NUM",
      headerName: "מספר",
      width: 80,
      headerAlign: HEADER_ALIGN,
      renderCell: (params) => <CellWithToolTip {...params} />,
    },
    {
      field: "UNIT_TYPE",
      headerName: "סוג יחידה",
      width: 100,
      headerAlign: HEADER_ALIGN,
      renderCell: (params) => <CellWithToolTip {...params} />,
    },
    {
      field: "longitude",
      headerName: "קו אורך",
      width: 150,
      headerAlign: HEADER_ALIGN,
      type: "number",
    },
    {
      field: "latitude",
      headerName: "קו רוחב",
      width: 150,
      headerAlign: HEADER_ALIGN,
      type: "number",
    },
    {
      field: "TIME",
      headerName: "זמן העדכון",
      width: 150,
      valueFormatter: ({ value }) =>
        value && moment(value).format("HH:mm DD.MM.YYYY"),
      headerAlign: HEADER_ALIGN,
      type: "dateTime",
    },
    {
      field: "EVENT_NUM",
      headerName: "מספר אירוע",
      width: 120,
      headerAlign: HEADER_ALIGN,
    },
    {
      field: "DISTRICT_NAME",
      headerName: "שם מחוז",
      width: 80,
      headerAlign: HEADER_ALIGN,
      renderCell: (params) => <CellWithToolTip {...params} />,
    },
    {
      field: "SUBDISTRICT_NAME",
      headerName: "שם נפה",
      width: 80,
      headerAlign: HEADER_ALIGN,
      renderCell: (params) => <CellWithToolTip {...params} />,
    },
    {
      field: "STATION_NAME",
      headerName: "שם תחנה",
      width: 100,
      headerAlign: HEADER_ALIGN,
      renderCell: (params) => <CellWithToolTip {...params} />,
    },
    {
      field: "MACHINE_TYPE",
      headerName: "סוג כלי רכב",
      width: 120,
      headerAlign: HEADER_ALIGN,
      renderCell: (params) => <CellWithToolTip {...params} />,
    },
    {
      field: "sendTimeScheduledAt",
      headerName: "תזמון שליחה לשועל",
      width: 170,
      valueFormatter: ({ value }) =>
        value && moment(value).format("HH:mm DD.MM.YYYY"),
      headerAlign: HEADER_ALIGN,
      type: "dateTime",
    },
    {
      field: "isAcceptedByShual",
      headerName: "אושר על ידי שועל",
      width: 150,
      headerAlign: HEADER_ALIGN,
      type: "boolean",
    },
    forcesAction,
  ];
};

export const invisibleColumns = {
  FORCE_IP: false,
  SUBDISTRICT_NAME: false,
  VEHICLE_NUM: false,
  isAcceptedByShual: false,
  latitude: false,
  longitude: false,
  EVENT_NUM: false,
};
