import moment from "moment";
import { Edit, Add, ContentCopy } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";
import {
  CellWithToolTip,
  DeleteWithDialog,
  Lonk,
  ToggleDisableRowButton,
} from "@components";
import { eventFields, MODULES_ROUTES, SCREEN_ROUTES } from "@constants";
import ViewDialogButton from "@components/buttons/ViewDialogButton/ViewDialogButton";
import { eventsFormSchema } from "@constants/formSchemas";

const HEADER_ALIGN = "center";

export const eventTableColumns = (api, refetch) => {
  const eventsActions = {
    field: "actions",
    type: "actions",
    width: 250,
    getActions: (params) => [
      <Lonk to={`${SCREEN_ROUTES.duplicate}/${params.id}`}>
        <Tooltip title="העתקת אירוע">
          <IconButton size="small">
            <ContentCopy />
          </IconButton>
        </Tooltip>
      </Lonk>,
      <Lonk to={`${SCREEN_ROUTES.evolve}/${params.id}`}>
        <Tooltip title="הוספת התפתחות">
          <IconButton size="small">
            <Add />
          </IconButton>
        </Tooltip>
      </Lonk>,
      <ViewDialogButton
        path={MODULES_ROUTES.events}
        uid={params.id}
        schema={eventsFormSchema}
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

      <ToggleDisableRowButton
        onSuccess={refetch}
        path={`${api}`}
        uid={params.id}
        currentisDisabledValue={params.row.isDisabled}
        disableToggle={!!params.row.acceptedByDestinationAt}
      />,
      <DeleteWithDialog onSuccess={refetch} path={`${api}/${params.id}`} />,
    ],
  };

  return [
    {
      field: eventFields.simulatorId.key,
      headerName: "מזהה",
      width: 150,
      headerAlign: HEADER_ALIGN,
      type: "number",
    },
    {
      field: eventFields.name.key,
      headerName: "שם",
      width: 200,
      headerAlign: HEADER_ALIGN,
      renderCell: (params) => <CellWithToolTip {...params} title="" />,
    },
    {
      field: eventFields.type.key,
      headerName: eventFields.type.label,
      width: 100,
      headerAlign: HEADER_ALIGN,
      renderCell: (params) => <CellWithToolTip {...params} title="" />,
    },
    {
      field: eventFields.generator.key,
      headerName: eventFields.generator.label,
      width: 100,
      headerAlign: HEADER_ALIGN,
      renderCell: (params) => <CellWithToolTip {...params} title="" />,
    },
    {
      field: eventFields.description.key,
      headerName: eventFields.description.label,
      width: 190,
      headerAlign: HEADER_ALIGN,
      renderCell: (params) => <CellWithToolTip {...params} title="" />,
    },
    {
      field: eventFields.status.key,
      headerName: eventFields.status.label,
      width: 100,
      headerAlign: HEADER_ALIGN,
    },
    {
      field: eventFields.importance.key,
      headerName: eventFields.importance.label,
      width: 120,
      headerAlign: HEADER_ALIGN,
      type: "number",
    },
    {
      field: eventFields.eventTakesPlaceAt.key,
      headerName: eventFields.eventTakesPlaceAt.label,
      width: 160,
      valueFormatter: ({ value }) =>
        value && moment(value).format("HH:mm DD.MM.YYYY"),
      headerAlign: HEADER_ALIGN,
      type: "dateTime",
    },
    {
      field: eventFields.eventEndsAt.key,
      headerName: eventFields.eventEndsAt.label,
      width: 160,
      valueFormatter: ({ value }) =>
        value && moment(value).format("HH:mm DD.MM.YYYY"),
      headerAlign: HEADER_ALIGN,
      type: "dateTime",
    },
    {
      field: eventFields.city.key,
      headerName: eventFields.city.label,
      width: 100,
      headerAlign: HEADER_ALIGN,
      renderCell: (params) => <CellWithToolTip {...params} />,
    },
    {
      field: eventFields.street.key,
      headerName: eventFields.street.label,
      width: 120,
      headerAlign: HEADER_ALIGN,
      renderCell: (params) => <CellWithToolTip {...params} />,
    },
    {
      field: eventFields.appartmentNumber.key,
      headerName: eventFields.appartmentNumber.label,
      width: 120,
      headerAlign: HEADER_ALIGN,
    },
    {
      field: eventFields.district.key,
      headerName: eventFields.district.label,
      width: 120,
      headerAlign: HEADER_ALIGN,
      renderCell: (params) => <CellWithToolTip {...params} />,
    },
    {
      field: eventFields.subDistrict.key,
      headerName: eventFields.subDistrict.label,
      width: 120,
      headerAlign: HEADER_ALIGN,
      renderCell: (params) => <CellWithToolTip {...params} />,
    },
    {
      field: eventFields.quarter.key,
      headerName: eventFields.quarter.label,
      width: 120,
      headerAlign: HEADER_ALIGN,
      renderCell: (params) => <CellWithToolTip {...params} />,
    },
    {
      field: eventFields.neighborhood.key,
      headerName: eventFields.neighborhood.label,
      width: 120,
      headerAlign: HEADER_ALIGN,
      renderCell: (params) => <CellWithToolTip {...params} />,
    },
    {
      field: eventFields.site.key,
      headerName: eventFields.site.label,
      width: 120,
      headerAlign: HEADER_ALIGN,
      renderCell: (params) => <CellWithToolTip {...params} />,
    },
    {
      field: eventFields.parentEvent.key,
      headerName: eventFields.parentEvent.label,
      width: 120,
      headerAlign: HEADER_ALIGN,
    },
    {
      field: eventFields.isExactLocation.key,
      headerName: eventFields.isExactLocation.label,
      width: 120,
      headerAlign: HEADER_ALIGN,
      type: "boolean",
    },
    {
      field: eventFields.isShownOnMain.key,
      headerName: eventFields.isShownOnMain.label,
      width: 120,
      headerAlign: HEADER_ALIGN,
      type: "boolean",
    },
    {
      field: eventFields.isBattalionCenter.key,
      headerName: eventFields.isBattalionCenter.label,
      width: 120,
      headerAlign: HEADER_ALIGN,
      type: "boolean",
    },
    {
      field: eventFields.isBuiltArea.key,
      headerName: eventFields.isBuiltArea.label,
      width: 120,
      headerAlign: HEADER_ALIGN,
      type: "boolean",
    },
    {
      field: eventFields.centralCommand.key,
      headerName: eventFields.centralCommand.label,
      width: 120,
      headerAlign: HEADER_ALIGN,
      type: "boolean",
    },
    {
      field: eventFields.districtCommand.key,
      headerName: eventFields.districtCommand.label,
      width: 120,
      headerAlign: HEADER_ALIGN,
      type: "boolean",
    },
    {
      field: eventFields.subDistrictCommand.key,
      headerName: eventFields.subDistrictCommand.label,
      width: 120,
      headerAlign: HEADER_ALIGN,
      type: "boolean",
    },
    {
      field: eventFields.eventManagerCalender.key,
      headerName: eventFields.eventManagerCalender.label,
      width: 120,
      headerAlign: HEADER_ALIGN,
    },
    {
      field: eventFields.authorizedCalender.key,
      headerName: eventFields.authorizedCalender.label,
      width: 120,
      headerAlign: HEADER_ALIGN,
    },
    {
      field: eventFields.authorizedCalenderForEdit.key,
      headerName: eventFields.authorizedCalenderForEdit.label,
      width: 120,
      headerAlign: HEADER_ALIGN,
    },
    {
      field: eventFields.lightInjured.key,
      headerName: eventFields.lightInjured.label,
      width: 120,
      headerAlign: HEADER_ALIGN,
      type: "number",
    },
    {
      field: eventFields.mediumInjured.key,
      headerName: eventFields.mediumInjured.label,
      width: 120,
      headerAlign: HEADER_ALIGN,
      type: "number",
    },
    {
      field: eventFields.severeInjured.key,
      headerName: eventFields.severeInjured.label,
      width: 120,
      headerAlign: HEADER_ALIGN,
      type: "number",
    },
    {
      field: eventFields.trapped.key,
      headerName: eventFields.trapped.label,
      width: 120,
      headerAlign: HEADER_ALIGN,
      type: "number",
    },
    {
      field: eventFields.casualties.key,
      headerName: eventFields.casualties.label,
      width: 120,
      headerAlign: HEADER_ALIGN,
      type: "number",
    },
    {
      field: eventFields.anxietyVictims.key,
      headerName: eventFields.anxietyVictims.label,
      width: 120,
      headerAlign: HEADER_ALIGN,
      type: "number",
    },
    {
      field: eventFields.longitude.key,
      headerName: eventFields.longitude.label,
      width: 120,
      headerAlign: HEADER_ALIGN,
      type: "number",
    },
    {
      field: eventFields.latitude.key,
      headerName: eventFields.latitude.label,
      width: 120,
      headerAlign: HEADER_ALIGN,
      type: "number",
    },
    {
      field: eventFields.reportingSource.key,
      headerName: eventFields.reportingSource.label,
      width: 120,
      headerAlign: HEADER_ALIGN,
    },
    {
      field: eventFields.damageLevel.key,
      headerName: eventFields.damageLevel.label,
      width: 120,
      headerAlign: HEADER_ALIGN,
    },
    {
      field: eventFields.lifeSavingPotential.key,
      headerName: eventFields.lifeSavingPotential.label,
      width: 120,
      headerAlign: HEADER_ALIGN,
    },
    {
      field: eventFields.treatmentStatus.key,
      headerName: eventFields.treatmentStatus.label,
      width: 120,
      headerAlign: HEADER_ALIGN,
    },
    {
      field: eventFields.structureType.key,
      headerName: eventFields.structureType.label,
      width: 120,
      headerAlign: HEADER_ALIGN,
    },
    {
      field: "isAcceptedByShual",
      headerName: "אושר על ידי שועל",
      width: 160,
      headerAlign: HEADER_ALIGN,
      type: "boolean",
    },
    {
      field: "isDisabled",
      headerName: "מושהה שליחה לשועל",
      width: 150,
      headerAlign: HEADER_ALIGN,
      type: "boolean",
    },
    {
      field: "isVibe",
      headerName: "האם אירוע אווירה",
      width: 150,
      headerAlign: HEADER_ALIGN,
      type: "boolean",
    },
    {
      field: eventFields.shualId.key,
      headerName: eventFields.shualId.label,
      width: 120,
      headerAlign: HEADER_ALIGN,
      type: "number",
    },
    {
      field: eventFields.sendTimeScheduledAt.key,
      headerName: eventFields.sendTimeScheduledAt.label,
      width: 160,
      valueFormatter: ({ value }) =>
        value && moment(value).format("HH:mm DD.MM.YYYY"),
      headerAlign: HEADER_ALIGN,
      type: "dateTime",
    },
    {
      field: eventFields.acceptedByDestinationAt.key,
      headerName: eventFields.acceptedByDestinationAt.label,
      width: 160,
      valueFormatter: ({ value }) =>
        value && moment(value).format("HH:mm DD.MM.YYYY"),
      headerAlign: HEADER_ALIGN,
      type: "dateTime",
    },
    {
      field: eventFields.updatedAt.key,
      headerName: eventFields.updatedAt.label,
      width: 160,
      valueFormatter: ({ value }) =>
        value && moment(value).format("HH:mm DD.MM.YYYY"),
      headerAlign: HEADER_ALIGN,
      type: "dateTime",
    },
    {
      field: eventFields.createdAt.key,
      headerName: eventFields.createdAt.label,
      width: 160,
      valueFormatter: ({ value }) =>
        value && moment(value).format("HH:mm DD.MM.YYYY"),
      headerAlign: HEADER_ALIGN,
      type: "dateTime",
    },
    eventsActions,
  ];
};

export const invisibleColumns = {
  [eventFields.simulatorId.key]: false,
  [eventFields.description.key]: false,
  [eventFields.importance.key]: false,
  [eventFields.eventEndsAt.key]: false,
  [eventFields.street.key]: false,
  [eventFields.appartmentNumber.key]: false,
  [eventFields.district.key]: false,
  [eventFields.subDistrict.key]: false,
  [eventFields.quarter.key]: false,
  [eventFields.neighborhood.key]: false,
  [eventFields.site.key]: false,
  [eventFields.parentEvent.key]: false,
  [eventFields.isExactLocation.key]: false,
  [eventFields.isShownOnMain.key]: false,
  [eventFields.isBuiltArea.key]: false,
  [eventFields.centralCommand.key]: false,
  [eventFields.districtCommand.key]: false,
  [eventFields.subDistrictCommand.key]: false,
  [eventFields.eventManagerCalender.key]: false,
  [eventFields.authorizedCalender.key]: false,
  [eventFields.lightInjured.key]: false,
  [eventFields.mediumInjured.key]: false,
  [eventFields.severeInjured.key]: false,
  [eventFields.trapped.key]: false,
  [eventFields.casualties.key]: false,
  [eventFields.anxietyVictims.key]: false,
  [eventFields.longitude.key]: false,
  [eventFields.latitude.key]: false,
  [eventFields.reportingSource.key]: false,
  [eventFields.damageLevel.key]: false,
  [eventFields.lifeSavingPotential.key]: false,
  [eventFields.treatmentStatus.key]: false,
  [eventFields.structureType.key]: false,
  [eventFields.authorizedCalenderForEdit.key]: false,
  [eventFields.shualId.key]: false,
  [eventFields.acceptedByDestinationAt.key]: false,
  [eventFields.createdAt.key]: false,
  [eventFields.updatedAt.key]: false,
  isAcceptedByShual: false,
  isDisabled: false,
  isVibe: false,
};
