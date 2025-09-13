import { useState } from "react";
import { styled } from "@mui/system";
import { useMutation } from "react-query";
import Joi from "joi";
import { CloseButton, LoadingIndicator } from "@components";
import { useEnvironment } from "@hooks";
import { api } from "@services";
import { convertExcelFormatToDataFormat } from "./convertExcelFormatToDataFormat";
import Dropzone from "./Dropzone";
import readExcelFile from "./readExcelFile";
import ReaderAlert from "./ExcelReaderErrorIndicator";

const DEFAULT_CHUNK_SIZE = 10;

const ERROR_TYPES = {
  validation: 1,
  load: 2,
  mutate: 3,
  chunk: 4,
  F5: 5,
};

const validateDataFromExcel = (obj, schemaToValidate) => {
  const { error } = Joi.array()
    .items(schemaToValidate)
    .validate(obj, { abortEarly: false });

  const errorParsedDetails = error?.details.map(({ context, path }) => {
    return { ...context, index: path[0] };
  });

  return errorParsedDetails;
};

const sendInBatches = async ({ method, data, path, chunkSize }) => {
  const requests = [];

  for (let i = 0; i < data.length; i += chunkSize) {
    const dataChunk = data.slice(i, i + chunkSize);

    requests.push(api({ method, url: `/${path}/${i / 10}`, data: dataChunk }));
  }

  const responses = await Promise.allSettled(requests);

  const rejectedIndexes = responsesToRejectedIndexes(
    responses,
    data.length,
    chunkSize
  );
  const sentData = filterAndParseFulfilled(responses);

  return { fulfilled: sentData, rejected: rejectedIndexes };
};

const responsesToRejectedIndexes = (responses, objsCount, chunkSize) => {
  const rejectedIndexes = [];
  responses.forEach(({ status, value }, index) => {
    if (status === "rejected" || checkF5Fail(value?.data)) {
      const chunkStartIndex = index * chunkSize + 1;
      const chunkEndIndex = (index + 1) * chunkSize;
      rejectedIndexes.push([
        chunkStartIndex,
        chunkEndIndex <= objsCount ? chunkEndIndex : objsCount,
      ]);
    }
  });

  return rejectedIndexes;
};

const filterAndParseFulfilled = (responses) => {
  return responses
    .map(({ value }) => value?.data)
    .filter((value) => value)
    .flat();
};

const checkF5Fail = (res) =>
  typeof res === "string" && res?.includes("<title>Request Rejected</title>");

function ExcelReader({
  excelColumns,
  moduleName,
  closeLink,
  path,
  schemaToValidate,
  useLabels,
}) {
  const dataType = path.substring(0, path.indexOf("/")) ?? "";
  const labelsDictionary = useLabels();

  const [isError, setIsError] = useState({});
  const { bulkF5ChunkSize } = useEnvironment({
    bulkF5ChunkSize: DEFAULT_CHUNK_SIZE,
  });

  const { mutate, data, isSuccess, isLoading } = useMutation({
    mutationFn: sendInBatches,
    onMutate: () => setIsError({}),
    onSuccess: (data) => {
      if (data?.rejected?.length) {
        setIsError({ type: ERROR_TYPES.chunk, ...data });
      }
    },
    onError: (err) => {
      if (err.message === "F5") {
        setIsError({ type: ERROR_TYPES.F5 });
      } else {
        setIsError({ type: ERROR_TYPES.mutate });
      }
    },
  });

  const processData = async ([firstFile]) => {
    if (!firstFile) {
      setIsError({ type: ERROR_TYPES.load });
    } else {
      const rows = await readExcelFile(firstFile).catch((err) => {
        setIsError({ type: ERROR_TYPES.load });
        console.error(err);
      });
      if (!rows.length) {
        setIsError({ type: ERROR_TYPES.load });
      } else {
        const convertedData = await convertExcelFormatToDataFormat(
          rows,
          labelsDictionary,
          dataType
        );

        const fieldErrors = validateDataFromExcel(
          convertedData,
          schemaToValidate
        );

        if (fieldErrors) {
          setIsError({ type: ERROR_TYPES.validation, errors: fieldErrors });
        } else {
          mutate({
            method: "POST",
            path,
            data: convertedData,
            chunkSize: bulkF5ChunkSize,
          });
        }
      }
    }
  };

  if (!labelsDictionary) return <LoadingIndicator />;
  return (
    <>
      {isLoading && <LoadingIndicator />}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          margin: "30px",
          marginTop: "1vw",
        }}
      >
        <span style={{ fontSize: "30px" }}>טעינת {moduleName} מקובץ אקסל</span>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <CloseButton closeLink={closeLink} />
        </div>
      </div>

      <ReaderAlert
        isOpen={isSuccess && !isError.type && !!data?.fulfilled?.length}
      >
        {data?.fulfilled &&
          `הקובץ נטען בהצלחה! נוספו ${data.fulfilled.length} ${moduleName} לסימולציה`}
      </ReaderAlert>
      <ReaderAlert
        isOpen={isError.type === ERROR_TYPES.mutate}
        severity="error"
      >
        {`אוי! התרחשה תקלה, הקובץ לא נטען`}
      </ReaderAlert>
      <ReaderAlert isOpen={isError.type === ERROR_TYPES.load} severity="error">
        {`לא נטענו רשומות! ייתכן שהקובץ ריק או פגום...`}
      </ReaderAlert>
      <ValidationErrorIndicator excelColumns={excelColumns} {...isError} />
      <ChunksErrorIndicator {...isError} />
      <ReaderAlert isOpen={isError.type === ERROR_TYPES.F5} severity="error">
        {`לצערנו לא נטענו רשומות, נסו פעם נוספת`}
      </ReaderAlert>

      <Dropzone
        onDrop={processData}
        description={
          <span style={{ fontSize: "25px" }}>הכניסו קובץ {moduleName}</span>
        }
      />
    </>
  );
}

const ValidationArea = styled("div")({
  display: "flex",
  flexDirection: "column",
  maxHeight: "100px",
  overflow: "auto",
  paddingRight: "30px",
  paddingBottom: "10px",
  color: "rgb(95, 33, 32)",
  backgroundColor: "rgb(253, 237, 237)",
});

const ExpandedText = styled("span")({ fontSize: "120%" });

function ValidationErrorIndicator({ type, errors, excelColumns }) {
  if (type !== ERROR_TYPES.validation) return null;
  return (
    <>
      <ReaderAlert severity="error">
        {"שמנו לב שיש בקובץ כמה ערכים לא תקינים:"}
      </ReaderAlert>
      <ValidationArea>
        {errors.map(({ label, key, index }) => (
          <div key={label}>
            ערך לא תקין בשורה
            <ExpandedText>{` ${index + 2} `}</ExpandedText>
            עבור עמודת
            <ExpandedText>{` ${excelColumns[key]?.label}`}</ExpandedText>
          </div>
        ))}
      </ValidationArea>
    </>
  );
}

function ChunksErrorIndicator({ type, rejected, fulfilled }) {
  if (type !== ERROR_TYPES.chunk) return null;
  return (
    <>
      <ReaderAlert severity="error">
        {"שימו לב! הרשומות הבאות לא נטענו, יש להעלות (רק) אותן מחדש"}
      </ReaderAlert>

      <ValidationArea>
        <ExpandedText>
          תקלה בשליחת רשומות:{" "}
          {rejected.map((value) => value.join("-")).join(", ")}
        </ExpandedText>
      </ValidationArea>
      <ReaderAlert isOpen={!!fulfilled.length}>
        {"שאר הרשומות נטענו בהצלחה!"}
      </ReaderAlert>
    </>
  );
}

export default ExcelReader;
