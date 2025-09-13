import { INPUT_TYPES } from "@constants";

export const refuaFormSchema = [
  {
    reportName: {
      key: "reportName",
      label: 'שם דו"ח',
      type: INPUT_TYPES.text,
      required: true,
    },
    sendTimeScheduledAt: {
      key: "sendTimeScheduledAt",
      label: "תזמון שליחה לרפואה",
      type: INPUT_TYPES.date,
      required: true,
    },
  },
];
