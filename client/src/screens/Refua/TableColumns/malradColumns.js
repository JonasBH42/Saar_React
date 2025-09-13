import { CellWithToolTip } from "@components";
import { validateNumberColumnEdit } from "./validateNumberColumnEdit";

const HEADER_ALIGN = "center";

export const malradTableColumns = (isOnEditMode) => {
  return [
    {
      field: "hospitalName",
      headerName: 'שם ביה"ח',
      width: 155,
      headerAlign: HEADER_ALIGN,
      renderCell: (params) => <CellWithToolTip {...params} title="" />,
    },
    {
      field: "district",
      headerName: "מחוז",
      width: 140,
      headerAlign: HEADER_ALIGN,
      renderCell: (params) => <CellWithToolTip {...params} title="" />,
    },
    {
      field: "severelyInjuredCivics",
      headerName: "אזרחים - קשה",
      ...defaultColumnSettings(isOnEditMode),
    },
    {
      field: "moderatelyInjuredCivics",
      headerName: "אזרחים - בינוני",
      ...defaultColumnSettings(isOnEditMode),
    },
    {
      field: "slightlyInjuredCivics",
      headerName: "אזרחים - קל",
      ...defaultColumnSettings(isOnEditMode),
    },
    {
      field: "anxietyInjuredCivics",
      headerName: "אזרחים - חרדה",
      ...defaultColumnSettings(isOnEditMode),
    },
    {
      field: "casualtiesCivics",
      headerName: "אזרחים - הרוגים",
      ...defaultColumnSettings(isOnEditMode),
    },
    {
      field: "severelyInjuredMilitary",
      headerName: "חיילים - קשה",
      ...defaultColumnSettings(isOnEditMode),
    },
    {
      field: "moderatelyInjuredMilitary",
      headerName: "חיילים - בינוני",
      ...defaultColumnSettings(isOnEditMode),
    },
    {
      field: "slightlyInjuredMilitary",
      headerName: "חיילים - קל",
      ...defaultColumnSettings(isOnEditMode),
    },
    {
      field: "anxietyInjuredMilitary",
      headerName: "חיילים - חרדה",
      ...defaultColumnSettings(isOnEditMode),
    },
    {
      field: "casualtiesMilitary",
      headerName: "חיילים - הרוגים",
      ...defaultColumnSettings(isOnEditMode),
    },
  ];
};

const defaultColumnSettings = (isOnEditMode) => ({
  width: 140,
  headerAlign: HEADER_ALIGN,
  type: "number",
  editable: isOnEditMode,
  preProcessEditCellProps: (params) => validateNumberColumnEdit(params),
  valueGetter: ({ value }) => value ?? 0,
});
