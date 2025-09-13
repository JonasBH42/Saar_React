import _ from "lodash";

export function getEditableFields(fieldsObj) {
  return _.omitBy(fieldsObj, ({ editable }) => editable === false);
}
