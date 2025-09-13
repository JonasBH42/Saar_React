import { LABELS } from "@constants";
import { convertDataValues, replaceMultipleChars } from "./parserFunctions";

export const convertExcelFormatToDataFormat = (
  rows,
  labelsDictionary,
  dataType
) => {
  const dataLabelToKey = LABELS[dataType];

  return rows.map((obj) => {
    const parsedObj = {};

    Object.entries(obj).forEach(([label, value]) => {
      const field = dataLabelToKey[replaceMultipleChars(label, "_", " ")];

      if (field) {
        parsedObj[field] = convertDataValues(value, labelsDictionary[field]);
      }
    });

    if (dataType === "events") {
      parsedObj.sendTimeScheduledAt = parsedObj.eventTakesPlaceAt;
      parsedObj.appartmentNumber =
        parsedObj.appartmentNumber && String(parsedObj.appartmentNumber);
      parsedObj.eventManagerCalender =
        parsedObj.eventManagerCalender &&
        String(parsedObj.eventManagerCalender);
      parsedObj.authorizedCalender =
        parsedObj.authorizedCalender && String(parsedObj.authorizedCalender);
      parsedObj.authorizedCalenderForEdit =
        parsedObj.authorizedCalenderForEdit &&
        String(parsedObj.authorizedCalenderForEdit);
    }

    return parsedObj;
  });
};
