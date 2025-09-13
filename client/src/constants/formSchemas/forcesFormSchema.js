import { INPUT_TYPES, LAT_LNG_VALIDATION } from "@constants";

export const forcesFormSchema = [
  {
    TIME: {
      key: "TIME",
      label: "זמן העדכון",
      type: INPUT_TYPES.date,
      required: true,
      defaultValue: true,
      validation: {
        required: {
          value: true,
          message: "יש לקבוע זמן עדכון",
        },
      },
    },
    sendTimeScheduledAt: {
      key: "sendTimeScheduledAt",
      label: "תזמון שליחה לשועל",
      type: INPUT_TYPES.date,
      required: true,
      defaultValue: true,
      validation: {
        required: {
          value: true,
          message: "יש לקבוע תאריך תזמון שליחה",
        },
      },
    },
    FORCE_IP: {
      key: "FORCE_IP",
      label: "מזהה כוח",
      type: INPUT_TYPES.text,
      required: true,
    },
  },
  {
    longitude: {
      key: "longitude",
      label: "קו אורך (x)",
      type: INPUT_TYPES.stateOriented,
      required: true,
      ...LAT_LNG_VALIDATION.longitude,
    },
    latitude: {
      key: "latitude",
      label: "קו רוחב (y)",
      type: INPUT_TYPES.stateOriented,
      required: true,
      ...LAT_LNG_VALIDATION.latitude,
    },
  },
  {
    FORCE_UNIT: {
      key: "FORCE_UNIT",
      label: "יחידת כוח",
      type: INPUT_TYPES.text,
      required: true,
    },
    VEHICLE_NUM: {
      key: "VEHICLE_NUM",
      label: "מספר רכב",
      type: INPUT_TYPES.text,
      required: true,
    },
    FORCE_TYPE: {
      key: "FORCE_TYPE",
      label: "סוג כוח",
      type: INPUT_TYPES.dropDown,
      required: true,
      defaultValue: 2,
    },
  },
  {
    MACHINE_TYPE: {
      key: "MACHINE_TYPE",
      label: "סוג כלי רכב",
      type: INPUT_TYPES.text,
    },
    EVENT_NUM: {
      key: "EVENT_NUM",
      label: "מספר אירוע",
      type: INPUT_TYPES.text,
    },
    DISTRICT_NAME: {
      key: "DISTRICT_NAME",
      label: "שם מחוז",
      type: INPUT_TYPES.text,
    },
  },
  {
    STATION_NAME: {
      key: "STATION_NAME",
      label: "שם תחנה",
      type: INPUT_TYPES.text,
    },
    SUBDISTRICT_NAME: {
      key: "SUBDISTRICT_NAME",
      label: "שם נפה",
      type: INPUT_TYPES.text,
    },
    UNIT_TYPE: {
      key: "UNIT_TYPE",
      label: "סוג יחידה",
      type: INPUT_TYPES.text,
      required: true,
    },
  },
];
