import moment from "moment";
import { Edit, ContentCopy } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";
import { CellWithToolTip, DeleteWithDialog, Lonk } from "@components";
import { MODULES_ROUTES, SCREEN_ROUTES } from "@constants";
import ViewDialogButton from "@components/buttons/ViewDialogButton/ViewDialogButton";
import { barrageFormSchema } from "@constants/formSchemas";

const HEADER_ALIGN = "center";
const NUMBER_COL_WIDTH = 70;
const DERIVED_MAP_MSG = "נגזר מהמפה";

export const barragesTableColumns = (api, refetch) => {
  const barragesAction = {
    field: "actions",
    type: "actions",
    width: 150,
    getActions: (params) => [
      <Lonk to={`${SCREEN_ROUTES.duplicate}/${params.id}`}>
        <IconButton size="small">
          <Tooltip title="העתקת מטח">
            <ContentCopy />
          </Tooltip>
        </IconButton>
      </Lonk>,
      <ViewDialogButton
        path={MODULES_ROUTES.barrages}
        uid={params.id}
        schema={barrageFormSchema}
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
          <Tooltip title="עריכת מטח">
            <Edit />
          </Tooltip>
        </IconButton>
      </Lonk>,
      <DeleteWithDialog onSuccess={refetch} path={`${api}/${params.id}`} />,
    ],
  };

  return [
    {
      field: "uid",
      headerName: "מזהה",
      width: 260,
      headerAlign: HEADER_ALIGN,
      renderCell: (params) => <CellWithToolTip {...params} />,
    },
    {
      field: "sendTimeScheduledAt",
      headerName: "זמן שליחה",
      width: 150,
      valueFormatter: ({ value }) =>
        value && moment(value).format("HH:mm DD.MM.YYYY"),
      type: "dateTime",
      headerAlign: HEADER_ALIGN,
    },
    {
      field: "longitude",
      headerName: "קו אורך",
      width: NUMBER_COL_WIDTH,
      headerAlign: HEADER_ALIGN,
      type: "number",
    },
    {
      field: "latitude",
      headerName: "קו רוחב",
      width: NUMBER_COL_WIDTH,
      headerAlign: HEADER_ALIGN,
      type: "number",
    },
    {
      field: "radius1",
      headerName: "רדיוס 1",
      width: NUMBER_COL_WIDTH,
      headerAlign: HEADER_ALIGN,
      type: "number",
    },
    {
      field: "radius2",
      headerName: "רדיוס 2",
      width: NUMBER_COL_WIDTH,
      headerAlign: HEADER_ALIGN,
      type: "number",
    },
    {
      field: "azimut",
      headerName: "זווית",
      width: NUMBER_COL_WIDTH,
      headerAlign: HEADER_ALIGN,
      type: "number",
    },
    {
      field: "district",
      headerName: "מחוז",
      placeholder: DERIVED_MAP_MSG,
      width: 120,
      headerAlign: HEADER_ALIGN,
      renderCell: (params) => <CellWithToolTip {...params} />,
    },
    {
      field: "subDistrict",
      headerName: "נפה",
      placeholder: DERIVED_MAP_MSG,
      width: 120,
      headerAlign: HEADER_ALIGN,
      renderCell: (params) => <CellWithToolTip {...params} />,
    },
    {
      field: "sourceName",
      headerName: "מחולל",
      width: 80,
      headerAlign: HEADER_ALIGN,
      renderCell: (params) => <CellWithToolTip {...params} />,
    },
    {
      field: "missileCategory",
      headerName: "קטגוריית טיל",
      width: 80,
      headerAlign: HEADER_ALIGN,
      renderCell: (params) => <CellWithToolTip {...params} />,
    },
    {
      field: "missileType",
      headerName: "סוג טיל",
      width: 100,
      headerAlign: HEADER_ALIGN,
      renderCell: (params) => <CellWithToolTip {...params} />,
    },
    {
      field: "sourceCountry",
      headerName: "מקור שיגור",
      width: 100,
      headerAlign: HEADER_ALIGN,
      renderCell: (params) => <CellWithToolTip {...params} />,
    },
    {
      field: "vibeEllipsesNumber",
      headerName: "אליפסות אווירה",
      width: 110,
      headerAlign: HEADER_ALIGN,
      type: "number",
    },
    {
      field: "vibeEventsNumber",
      headerName: "אירועי אווירה",
      width: 110,
      headerAlign: HEADER_ALIGN,
      type: "number",
    },
    {
      field: "acceptedByDestinationAt",
      headerName: "התקבל בשועל ב",
      width: 160,
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
    {
      field: "updatedAt",
      headerName: "עודכן לאחרונה ב",
      width: 160,
      valueFormatter: ({ value }) =>
        value && moment(value).format("HH:mm DD.MM.YYYY"),
      headerAlign: HEADER_ALIGN,
      type: "dateTime",
    },
    {
      field: "createdAt",
      headerName: "נוצר ב",
      width: 160,
      valueFormatter: ({ value }) =>
        value && moment(value).format("HH:mm DD.MM.YYYY"),
      headerAlign: HEADER_ALIGN,
      type: "dateTime",
    },
    barragesAction,
  ];
};

export const invisibleColumns = {
  uid: false,
  missileCategory: false,
  acceptedByDestinationAt: false,
  isAcceptedByShual: false,
  createdAt: false,
  updatedAt: false,
};
