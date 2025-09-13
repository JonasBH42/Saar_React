export const extractEnumsId = (obj) => {
  const idKey = "ID";
  Object.entries(obj).forEach(([key, val]) => {
    if (val?.hasOwnProperty(idKey)) {
      obj[key] = val[idKey];
    }
  });

  return obj;
};
