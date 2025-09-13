export const resetObjectsValues = (array, keys) => {
  array.forEach((row) => {
    Object.keys(row).forEach((key) => {
      if (!keys.includes(key)) {
        row[key] = 0;
      }
    });
  });

  return array;
};
