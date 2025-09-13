export const emptyObjectValues = (obj) => {
  const objCopy = { ...obj };
  Object.keys(objCopy).forEach((key) => {
    objCopy[key] = [];
  });

  return objCopy;
};
