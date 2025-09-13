import Joi from "joi";
import { generateSchema } from "@services";
import { INPUT_TYPES } from "@constants";
import { LAT_LNG_VALIDATION } from "./latLngValidation";

export const barrageFields = {
  uid: {
    key: "uid",
    label: "מזהה רשומה",
    condition: Joi.string().uuid().optional(),
    editable: false,
  },
  sourceName: {
    key: "sourceName",
    label: "מחולל",
    condition: Joi.number().integer().min(0).required(),
    type: INPUT_TYPES.dropDown,
    required: true,
  },
  missileCategory: {
    key: "missileCategory",
    label: "קטגוריית טיל",
    condition: Joi.number().integer().min(0).required(),
    type: INPUT_TYPES.dropDown,
    required: true,
  },
  missileType: {
    key: "missileType",
    label: "סוג טיל",
    condition: Joi.number().integer().min(0).required(),
    type: INPUT_TYPES.dropDown,
    required: true,
  },
  sourceCountry: {
    key: "sourceCountry",
    label: "מקור שיגור",
    condition: Joi.number().integer().min(0).required(),
    type: INPUT_TYPES.dropDown,
    required: true,
  },
  longitude: {
    key: "longitude",
    label: "X קו אורך",
    condition: Joi.number().required(),
    type: INPUT_TYPES.stateOriented,
    required: true,
    ...LAT_LNG_VALIDATION.longitude,
  },
  latitude: {
    key: "latitude",
    label: "Y קו רוחב",
    condition: Joi.number().required(),
    type: INPUT_TYPES.stateOriented,
    required: true,
    ...LAT_LNG_VALIDATION.latitude,
  },
  radius1: {
    key: "radius1",
    label: "רדיוס 1",
    condition: Joi.number().required(),
    type: INPUT_TYPES.stateOriented,
    validation: {
      max: 40,
    },
  },
  radius2: {
    key: "radius2",
    label: "רדיוס 2",
    condition: Joi.number().required(),
    type: INPUT_TYPES.stateOriented,
    validation: {
      max: 40,
    },
  },
  azimut: {
    key: "azimut",
    label: "אזימוט",
    condition: Joi.number().required(),
    type: INPUT_TYPES.stateOriented,
    validation: {
      max: 360,
    },
  },
  barrageRadius: {
    key: "barrageRadius",
    label: "רדיוס מטח",
    condition: Joi.number().required(),
    type: INPUT_TYPES.stateOriented,
    validation: {
      max: 40,
    },
  },
  vibeEllipsesNumber: {
    key: "vibeEllipsesNumber",
    label: "מספר מופעים",
    condition: Joi.number().required(),
    type: INPUT_TYPES.stateOriented,
    validation: {
      max: 100,
    },
  },
  vibeEventsNumber: {
    key: "vibeEventsNumber",
    label: "מספר אירועי אווירה",
    condition: Joi.number().required(),
    type: INPUT_TYPES.custom,
    validation: {
      max: 100,
    },
  },
  sendTimeScheduledAt: {
    key: "sendTimeScheduledAt",
    label: "תזמון שיגור",
    condition: Joi.date().optional(),
    type: INPUT_TYPES.date,
    required: true,
    validation: {
      required: {
        value: true,
        message: "יש לקבוע תאריך תזמון שיגור",
      },
    },
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
};

export const barrageSchema = generateSchema(barrageFields);

export const barrageLabelToKey = {};
Object.values(barrageFields).forEach((obj) => {
  barrageLabelToKey[obj.label] = obj.key;
});
