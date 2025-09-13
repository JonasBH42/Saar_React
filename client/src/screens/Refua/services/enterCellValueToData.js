export const enterCellValueToData = (data, cell) => {
  data.forEach((hospital) => {
    if (cell.id === hospital.id) {
      hospital[cell.field] = cell.value;
    }
  });

  return data;
};
