import { CellWithToolTip } from "@components";
import { validateNumberColumnEdit } from "./validateNumberColumnEdit";

const HEADER_ALIGN = "center";
const NARROW_COL = 87;

export const columnGroupingModel = [
  {
    groupId: "Neurosurgery",
    headerName: "נוירוכירורגיה + ט.נ.נוירוכירורגי",
    headerAlign: HEADER_ALIGN,
    children: [
      { field: "totalNeurosurgery" },
      { field: "occupiedNeurosurgery" },
    ],
  },
  {
    groupId: "OperatingRooms",
    headerName: "חדרי ניתוח",
    headerAlign: HEADER_ALIGN,
    children: [
      { field: "totalOperatingRooms" },
      { field: "occupiedOperatingRooms" },
    ],
  },
  {
    groupId: "IcuChildren",
    headerName: "טיפול נמרץ (ילדים)",
    headerAlign: HEADER_ALIGN,
    children: [{ field: "totalIcuChildren" }, { field: "occupiedIcuChildren" }],
  },
  {
    groupId: "IcuAdult",
    headerName: "טיפול נמרץ (מבוגרים)",
    headerAlign: HEADER_ALIGN,
    children: [{ field: "totalIcuAdult" }, { field: "occupiedIcuAdult" }],
  },
  {
    groupId: "EmergencyDepartments",
    headerName: 'מיטות במלר"ד',
    headerAlign: HEADER_ALIGN,
    children: [
      { field: "totalEmergencyDepartments" },
      { field: "occupiedEmergencyDepartments" },
    ],
  },
  {
    groupId: "TraumaBeds",
    headerName: "מיטות טראומה",
    headerAlign: HEADER_ALIGN,
    children: [{ field: "totalTraumaBeds" }, { field: "occupiedTraumaBeds" }],
  },
  {
    groupId: "Orthopedics",
    headerName: "מיטות אורתופדיה",
    headerAlign: HEADER_ALIGN,
    children: [{ field: "totalOrthopedics" }, { field: "occupiedOrthopedics" }],
  },
  {
    groupId: "Surgery",
    headerName: "כירורגיה",
    headerAlign: HEADER_ALIGN,
    children: [{ field: "totalSurgery" }, { field: "occupiedSurgery" }],
  },
];

export const bedsTableColumns = (isOnEditMode) => {
  return [
    {
      field: "hospitalName",
      headerName: 'שם ביה"ח',
      width: 100,
      headerAlign: HEADER_ALIGN,
      renderCell: (params) => <CellWithToolTip {...params} title="" />,
    },
    {
      field: "district",
      headerName: "מחוז",
      width: 120,
      headerAlign: HEADER_ALIGN,
      renderCell: (params) => <CellWithToolTip {...params} title="" />,
    },
    {
      field: "totalNeurosurgery",
      headerName: 'סה"כ',
      ...defaultColumnSettings(isOnEditMode, 100),
      editable: false,
    },
    {
      field: "occupiedNeurosurgery",
      headerName: "מאוכלס",
      ...defaultColumnSettings(isOnEditMode, 100),
    },
    {
      field: "totalOperatingRooms",
      headerName: 'סה"כ',
      ...defaultColumnSettings(isOnEditMode, NARROW_COL),
      editable: false,
    },
    {
      field: "occupiedOperatingRooms",
      headerName: "מאוכלס",
      ...defaultColumnSettings(isOnEditMode, NARROW_COL),
    },
    {
      field: "totalIcuChildren",
      headerName: 'סה"כ',
      ...defaultColumnSettings(isOnEditMode, NARROW_COL),
      editable: false,
    },
    {
      field: "occupiedIcuChildren",
      headerName: "מאוכלס",
      ...defaultColumnSettings(isOnEditMode, NARROW_COL),
    },
    {
      field: "totalIcuAdult",
      headerName: 'סה"כ',
      ...defaultColumnSettings(isOnEditMode, NARROW_COL),
      editable: false,
    },
    {
      field: "occupiedIcuAdult",
      headerName: "מאוכלס",
      ...defaultColumnSettings(isOnEditMode, NARROW_COL),
    },
    {
      field: "totalTraumaBeds",
      headerName: 'סה"כ',
      ...defaultColumnSettings(isOnEditMode, NARROW_COL),
      editable: false,
    },
    {
      field: "occupiedTraumaBeds",
      headerName: "מאוכלס",
      ...defaultColumnSettings(isOnEditMode, NARROW_COL),
    },
    {
      field: "totalEmergencyDepartments",
      headerName: 'סה"כ',
      ...defaultColumnSettings(isOnEditMode, NARROW_COL),
      editable: false,
    },
    {
      field: "occupiedEmergencyDepartments",
      headerName: "מאוכלס",
      ...defaultColumnSettings(isOnEditMode, NARROW_COL),
    },
    {
      field: "totalOrthopedics",
      headerName: 'סה"כ',
      ...defaultColumnSettings(isOnEditMode, NARROW_COL),
      editable: false,
    },
    {
      field: "occupiedOrthopedics",
      headerName: "מאוכלס",
      ...defaultColumnSettings(isOnEditMode, NARROW_COL),
    },
    {
      field: "totalSurgery",
      headerName: 'סה"כ',
      ...defaultColumnSettings(isOnEditMode, NARROW_COL),
      editable: false,
    },
    {
      field: "occupiedSurgery",
      headerName: "מאוכלס",
      ...defaultColumnSettings(isOnEditMode, NARROW_COL),
    },
  ];
};

const defaultColumnSettings = (isOnEditMode, width = 165) => ({
  width: width,
  headerAlign: HEADER_ALIGN,
  editable: isOnEditMode,
  type: "number",
  preProcessEditCellProps: (params) => validateNumberColumnEdit(params),
  valueGetter: ({ value }) => value ?? 0,
});
