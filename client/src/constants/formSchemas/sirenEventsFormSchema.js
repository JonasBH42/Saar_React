import Joi from "joi";
import { INPUT_TYPES } from "@constants";
import SirensFormPolygon from "@components/GenericForm/customFields/sirens/SirensFormPolygon";
import DragAndDrop from "@components/GenericForm/customFields/sirens/DragAndDrop";

export const sirenEventsFormSchema = [
  {
    name: {
      key: "name",
      label: "שם אירוע",
      type: INPUT_TYPES.text,
      required: true,
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
          message: "יש להוסיף תאריך תזמון שליחה לשועל",
        },
      },
    },
    status: {
      key: "status",
      label: "פעולה",
      condition: Joi.number().integer().min(0).required(),
      type: INPUT_TYPES.dropDown,
      required: true,
    },
  },
  {
    formPolygonDrawer: {
      key: "formPolygonDrawer",
      label: "צייר פוליגון ",
      type: INPUT_TYPES.custom,
      required: true,
      Element: (props) => <SirensFormPolygon {...props} />,
      hideField: true,
    },
  },
  {
    relatedSirens: {
      key: "relatedSirens",
      label: "צופרים מושפעים",
      type: INPUT_TYPES.custom,
      validation: {
        required: {
          value: true,
          message: "יש להשפיע לפחות על צופר אחד",
        },
      },
      Element: (props) => <DragAndDrop {...props} />,
      hideField: true,
    },
  },
];
