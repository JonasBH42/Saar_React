// https://github.com/Rinlama/ReactTools/blob/readexcel/src/App.js
import * as xlsx from "xlsx";

export const readExcelFile = (file) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsArrayBuffer(file);

    fileReader.onload = (e) => {
      try {
        const bufferArray = e.target.result;

        const workBook = xlsx.read(bufferArray, {
          type: "buffer",
          cellDates: true,
        });
        const workSheetName = workBook.SheetNames[0];
        const workSheet = workBook.Sheets[workSheetName];

        const data = xlsx.utils.sheet_to_json(workSheet);

        resolve(data);
      } catch (error) {
        reject(error);
      }
    };

    fileReader.onerror = (error) => {
      reject(error);
    };
  });
};

export default readExcelFile;
