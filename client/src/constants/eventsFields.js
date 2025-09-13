import Joi from "joi";
import { INPUT_TYPES } from "@constants";
import { generateSchema } from "@services";
import { LAT_LNG_VALIDATION } from "./latLngValidation";

// This object unifies the permanent event settings

const MAX_STR_LENGTH = 65535;

const AUTHORIZED_CALENDER_REGEX = /^(\d+,)*\d+$/;
const EVENT_MANAGER_CALENDER_REGEX = /^\d+$/;
const DERIVED_MAP_MSG = "נגזר מהמפה";

export const eventFields = {
  uid: {
    key: "uid",
    label: "מזהה רשומה",
    condition: Joi.string().uuid().optional(),
    editable: false,
  },
  simulatorId: {
    key: "simulatorId",
    label: "מזהה סימולטור",
    condition: Joi.number().integer().min(1).optional(),
    editable: false,
  },
  name: {
    key: "name",
    label: "שם האירוע",
    condition: Joi.string().max(MAX_STR_LENGTH).required(),
    type: INPUT_TYPES.text,
    required: true,
  },
  importance: {
    key: "importance",
    label: "חשיבות",
    condition: Joi.number().integer().min(0).max(5).required(),
    type: INPUT_TYPES.rating,
    defaultValue: 0,
  },
  longitude: {
    key: "longitude",
    label: "X",
    condition: Joi.number().required(),
    type: INPUT_TYPES.stateOriented,
    required: true,
    ...LAT_LNG_VALIDATION.longitude,
  },
  latitude: {
    key: "latitude",
    label: "Y",
    condition: Joi.number().required(),
    type: INPUT_TYPES.stateOriented,
    required: true,
    ...LAT_LNG_VALIDATION.latitude,
  },
  generator: {
    key: "generator",
    label: "מחולל",
    condition: Joi.number().integer().min(0).required(),
    type: INPUT_TYPES.dropDown,
    required: true,
  },
  type: {
    key: "type",
    label: "סוג",
    condition: Joi.number().integer().min(0).required(),
    type: INPUT_TYPES.dropDown,
    required: true,
  },
  status: {
    key: "status",
    label: "סטטוס",
    condition: Joi.number().integer().min(0).required(),
    type: INPUT_TYPES.dropDown,
    required: true,
    defaultValue: 1,
  },
  damageLevel: {
    key: "damageLevel",
    label: "רמת נזק",
    condition: Joi.number().integer().min(0).optional(),
    type: INPUT_TYPES.dropDown,
    defaultValue: 1,
  },
  lifeSavingPotential: {
    key: "lifeSavingPotential",
    label: "פונטציאל הצלת חיים",
    condition: Joi.number().integer().min(0).optional(),
    type: INPUT_TYPES.dropDown,
    defaultValue: 4,
  },
  treatmentStatus: {
    key: "treatmentStatus",
    label: "סטטוס ציוות",
    condition: Joi.number().integer().min(0).required(),
    type: INPUT_TYPES.dropDown,
    required: true,
    defaultValue: 1,
  },
  reportingSource: {
    key: "reportingSource",
    label: "מקור דיווח",
    condition: Joi.number().integer().min(0).optional(),
    type: INPUT_TYPES.dropDown,
    required: true,
    defaultValue: 1,
  },
  structureType: {
    key: "structureType",
    label: "סוג מבנה",
    condition: Joi.number().integer().min(0).optional(),
    type: INPUT_TYPES.dropDown,
  },
  description: {
    key: "description",
    label: "תיאור",
    condition: Joi.string().max(MAX_STR_LENGTH).optional(),
    type: INPUT_TYPES.longText,
  },
  centralCommand: {
    key: "centralCommand",
    label: "מרכזי/פיקוד",
    condition: Joi.boolean().optional(),
    type: INPUT_TYPES.checkbox,
  },
  districtCommand: {
    key: "districtCommand",
    label: "מרכזי/מחוז",
    condition: Joi.boolean().optional(),
    type: INPUT_TYPES.checkbox,
  },
  subDistrictCommand: {
    key: "subDistrictCommand",
    label: "מרכזי/נפה",
    condition: Joi.boolean().optional(),
    type: INPUT_TYPES.checkbox,
  },
  isShownOnMain: {
    key: "isShownOnMain",
    label: "מוצג בראשי",
    condition: Joi.boolean().optional(),
    type: INPUT_TYPES.checkbox,
  },
  isBuiltArea: {
    key: "isBuiltArea",
    label: "שטח בנוי",
    condition: Joi.boolean().optional(),
    type: INPUT_TYPES.checkbox,
  },
  isExactLocation: {
    key: "isExactLocation",
    label: "מיקום מדויק",
    condition: Joi.boolean().optional(),
    type: INPUT_TYPES.checkbox,
  },
  isBattalionCenter: {
    key: "isBattalionCenter",
    label: "מרכזי גדודי",
    condition: Joi.boolean().optional(),
    type: INPUT_TYPES.checkbox,
  },

  eventTakesPlaceAt: {
    key: "eventTakesPlaceAt",
    label: "זמן התרחשות",
    condition: Joi.date().required(),
    type: INPUT_TYPES.date,
    required: true,
    defaultValue: true,
  },
  eventEndsAt: {
    key: "eventEndsAt",
    label: "סיום",
    condition: Joi.date().optional(),
    type: INPUT_TYPES.date,
  },
  anxietyVictims: {
    key: "anxietyVictims",
    label: "חרדה",
    condition: Joi.number().integer().min(0).optional(),
    type: INPUT_TYPES.number,
    defaultValue: 0,
  },
  lightInjured: {
    key: "lightInjured",
    label: "קל",
    condition: Joi.number().integer().min(0).optional(),
    type: INPUT_TYPES.number,
    defaultValue: 0,
  },
  mediumInjured: {
    key: "mediumInjured",
    label: "בינוני",
    condition: Joi.number().integer().min(0).optional(),
    type: INPUT_TYPES.number,
    defaultValue: 0,
  },
  severeInjured: {
    key: "severeInjured",
    label: "קשה",
    condition: Joi.number().integer().min(0).optional(),
    type: INPUT_TYPES.number,
    defaultValue: 0,
  },
  trapped: {
    key: "trapped",
    label: "לכוד",
    condition: Joi.number().integer().min(0).optional(),
    type: INPUT_TYPES.number,
    defaultValue: 0,
  },
  casualties: {
    key: "casualties",
    label: "חלל",
    condition: Joi.number().integer().min(0).optional(),
    type: INPUT_TYPES.number,
    defaultValue: 0,
  },
  city: {
    key: "city",
    label: "יישוב",
    placeholder: DERIVED_MAP_MSG,
    condition: Joi.string().max(MAX_STR_LENGTH).optional(),
    type: INPUT_TYPES.custom,
    editable: false,
  },
  street: {
    key: "street",
    label: "רחוב/אתר",
    condition: Joi.string().max(MAX_STR_LENGTH).optional(),
    type: INPUT_TYPES.text,
  },
  appartmentNumber: {
    key: "appartmentNumber",
    label: "מספר",
    condition: Joi.string().max(10).optional(),
    type: INPUT_TYPES.text,
  },
  district: {
    key: "district",
    placeholder: DERIVED_MAP_MSG,
    label: "מחוז",
    condition: Joi.string().max(MAX_STR_LENGTH).optional(),
    type: INPUT_TYPES.custom,
    editable: false,
  },
  subDistrict: {
    key: "subDistrict",
    label: "נפה",
    placeholder: DERIVED_MAP_MSG,
    condition: Joi.string().max(MAX_STR_LENGTH).optional(),
    type: INPUT_TYPES.custom,
    editable: false,
  },
  quarter: {
    key: "quarter",
    label: "רובע",
    condition: Joi.string().max(MAX_STR_LENGTH).optional(),
    type: INPUT_TYPES.text,
  },
  neighborhood: {
    key: "neighborhood",
    label: "שכונה",
    condition: Joi.string().max(MAX_STR_LENGTH).optional(),
    type: INPUT_TYPES.text,
  },
  site: {
    key: "site",
    label: "אתר",
    condition: Joi.string().max(MAX_STR_LENGTH).optional(),
    type: INPUT_TYPES.text,
  },
  parentEvent: {
    key: "parentEvent",
    label: "אירוע אב",
    condition: Joi.string().max(MAX_STR_LENGTH).optional(),
    editable: false,
  },
  eventManagerCalender: {
    key: "eventManagerCalender",
    label: "יומן מנהל אירוע",
    condition: Joi.string()
      .regex(EVENT_MANAGER_CALENDER_REGEX)
      .max(MAX_STR_LENGTH)
      .optional(),
    type: INPUT_TYPES.text,
    validation: {
      pattern: {
        value: EVENT_MANAGER_CALENDER_REGEX,
        message: "יומן מנהל אירוע הוא מספר יחיד",
      },
    },
  },
  authorizedCalender: {
    key: "authorizedCalender",
    label: "יומנים מורשים",
    condition: Joi.string()
      .regex(AUTHORIZED_CALENDER_REGEX)
      .max(MAX_STR_LENGTH)
      .optional(),
    type: INPUT_TYPES.text,
    validation: {
      pattern: {
        value: AUTHORIZED_CALENDER_REGEX,
        message: "יומנים מורשים ייכתבו כרשימת מספרים המופרדים בפסיקים.",
      },
    },
  },
  authorizedCalenderForEdit: {
    key: "authorizedCalenderForEdit",
    label: "יומנים מורשים לעריכה",
    condition: Joi.string()
      .regex(AUTHORIZED_CALENDER_REGEX)
      .max(MAX_STR_LENGTH)
      .optional(),
    type: INPUT_TYPES.text,
    validation: {
      pattern: {
        value: AUTHORIZED_CALENDER_REGEX,
        message: "יומנים מורשים לעריכה ייכתבו כרשימת מספרים המופרדים בפסיקים.",
      },
    },
  },
  sendTimeScheduledAt: {
    key: "sendTimeScheduledAt",
    label: "תזמון שליחה לשועל",
    condition: Joi.date().optional(),
    type: INPUT_TYPES.date,
    required: true,
    validation: {
      required: {
        value: true,
        message: "יש לקבוע תאריך תזמון שליחה",
      },
    },
  },
  acceptedByDestinationAt: {
    key: "acceptedByDestinationAt",
    label: "זמן קבלה בשועל",
    condition: Joi.date().optional(),
    type: INPUT_TYPES.date,
    required: true,
    editable: false,
  },
  createdAt: {
    key: "createdAt",
    label: "זמן יצירת רשומה",
    condition: Joi.date().optional(),
    type: INPUT_TYPES.date,
    editable: false,
  },
  updatedAt: {
    key: "updatedAt",
    label: "זמן עדכון אחרון לרשומה",
    condition: Joi.date().optional(),
    type: INPUT_TYPES.date,
    editable: false,
  },
  shualId: {
    key: "shualId",
    label: "מזהה שועל",
    condition: Joi.number().integer().min(0).optional(),
    type: INPUT_TYPES.number,
    editable: false,
  },
};

export const eventSchema = generateSchema(eventFields);

export const eventLabelToKey = {};
Object.values(eventFields).forEach((obj) => {
  eventLabelToKey[obj.label] = obj.key;
});
