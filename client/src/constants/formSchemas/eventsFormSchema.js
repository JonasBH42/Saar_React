import { eventFields } from "@constants";
import PresentationSpatialInput from "@components/GenericForm/customFields/events/PresentationSpatialInput";

export const eventsFormSchema = [
  {
    name: {
      ...eventFields.name,
    },
    importance: {
      ...eventFields.importance,
    },
    sendTimeScheduledAt: {
      ...eventFields.sendTimeScheduledAt,
    },
  },
  {
    longitude: {
      ...eventFields.longitude,
      label: "קו אורך (x)",
    },
    latitude: {
      ...eventFields.latitude,
      label: "קו רוחב (y)",
    },
    reportingSource: {
      ...eventFields.reportingSource,
    },
  },
  {
    generator: {
      ...eventFields.generator,
    },
    type: {
      ...eventFields.type,
    },
    status: {
      ...eventFields.status,
    },
  },
  {
    damageLevel: {
      ...eventFields.damageLevel,
    },
    lifeSavingPotential: {
      ...eventFields.lifeSavingPotential,
      label: "פוטנציאל הצלת חיים",
    },
    treatmentStatus: {
      ...eventFields.treatmentStatus,
    },
  },
  {
    description: {
      ...eventFields.description,
    },
  },
  {
    isExactLocation: {
      ...eventFields.isExactLocation,
    },
    centralCommand: {
      ...eventFields.centralCommand,
    },
    districtCommand: {
      ...eventFields.districtCommand,
    },
    subDistrictCommand: {
      ...eventFields.subDistrictCommand,
    },
    isShownOnMain: {
      ...eventFields.isShownOnMain,
    },
    isBuiltArea: {
      ...eventFields.isBuiltArea,
    },
    isBattalionCenter: {
      ...eventFields.isBattalionCenter,
    },
  },
  {
    eventTakesPlaceAt: {
      ...eventFields.eventTakesPlaceAt,
      label: "זמן התרחשות",
    },
    eventEndsAt: {
      ...eventFields.eventEndsAt,
      label: "זמן סיום",
    },
  },
  {
    anxietyVictims: {
      ...eventFields.anxietyVictims,
    },
    lightInjured: {
      ...eventFields.lightInjured,
    },
    mediumInjured: {
      ...eventFields.mediumInjured,
    },
    severeInjured: {
      ...eventFields.severeInjured,
    },
    trapped: {
      ...eventFields.trapped,
    },
    casualties: {
      ...eventFields.casualties,
    },
  },
  {
    district: {
      ...eventFields.district,
      Element: (props) => <PresentationSpatialInput {...props} />,
    },
    subDistrict: {
      ...eventFields.subDistrict,
      Element: (props) => <PresentationSpatialInput {...props} />,
    },
    city: {
      ...eventFields.city,
      Element: (props) => <PresentationSpatialInput {...props} />,
    },
  },
  {
    street: {
      ...eventFields.street,
    },
    appartmentNumber: {
      ...eventFields.appartmentNumber,
    },
    quarter: {
      ...eventFields.quarter,
    },
  },
  {
    neighborhood: {
      ...eventFields.neighborhood,
    },
    site: {
      ...eventFields.site,
    },
    structureType: {
      ...eventFields.structureType,
    },
  },
  {
    eventManagerCalender: {
      ...eventFields.eventManagerCalender,
    },
    authorizedCalender: {
      ...eventFields.authorizedCalender,
    },
    authorizedCalenderForEdit: {
      ...eventFields.authorizedCalenderForEdit,
    },
  },
];
