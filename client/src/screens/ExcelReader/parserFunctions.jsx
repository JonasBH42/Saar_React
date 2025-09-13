import moment from "moment";

const DATE_EXCEL_GROUPS =
  /([012]{0,1}[0-9]:[0-6][0-9])\s(([1-9]|([012][0-9])|(3[01]))\/([0]{0,1}[1-9]|1[012])\/\d\d\d\d)/;

const DATE_EXCEL_FORMAT =
  /^([012]{0,1}[0-9]:[0-6][0-9]) (([1-9]|([012][0-9])|(3[01]))\/([0]{0,1}[1-9]|1[012])\/\d\d\d\d)$/;

export const replaceMultipleChars = (str, existingChars, newChars) => {
  return str.split(existingChars).join(newChars);
};

export const convertDataValues = (value, labelsDictionary) => {
  if (value === "") {
    return undefined;
  }
  let finalValue = value;
  if (typeof value === "string" && value.match("''")) {
    finalValue = replaceMultipleChars(value, "''", '"');
  }
  if (labelsDictionary?.[finalValue]) {
    return labelsDictionary[finalValue];
  }

  if (typeof finalValue === "string" && finalValue?.match(DATE_EXCEL_FORMAT)) {
    return replaceDateToJsFormat(finalValue);
  }

  switch (finalValue) {
    case "לא":
      return false;
    case "כן":
      return true;

    default:
      return finalValue;
  }
};

export const replaceDateToJsFormat = (value) => {
  const newDate = value.replace(DATE_EXCEL_GROUPS, "$2 $1");
  const dateMomentString = moment(newDate, "DD/MM/YYYY HH:mm");

  return dateMomentString.toDate();
};
