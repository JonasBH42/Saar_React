import Joi from "joi";

export const generateSchema = (columns) => {
  const conditionByNames = {};

  Object.values(columns).forEach(({ key, condition }) => {
    if (condition) {
      conditionByNames[key] = condition;
    }
  });

  return Joi.object(conditionByNames);
};
