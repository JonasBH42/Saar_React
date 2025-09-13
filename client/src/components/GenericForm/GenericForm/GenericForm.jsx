import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";
import { useMutation } from "react-query";
import { useSetRecoilState, useRecoilValue, useRecoilState } from "recoil";
import _ from "lodash";
import { DevTool } from "@hookform/devtools";
import { Typography, InputLabel, IconButton } from "@mui/material";
import { Icon } from "@iconify/react/dist/offline";
import { ExitWithDialog, LoadingIndicator } from "@components";
import { emptyObjectValues, getFailureSwal, getSuccessSwal } from "@services";
import {
  formValuesState,
  geoCoderValues,
  formTransitionValuesState,
  formPolygonState,
  selectedSirenEventsState,
} from "@states";
import FormField from "../FormField/FormField";
import { ValidationErrorDialog } from "../ValidationErrorDialog";
import "./GenericForm.css";

const MAX_TITLE_LEN = 66;
// A schema - List of rows, each row is an object that holds objects that define the fields in that row.

function GenericForm({
  defaultValues = {},
  formSchema,
  title,
  closeLink,
  route,
  isAccepted,
  method,
  transferOperationValues,
  transferredValuesNames,
}) {
  const [isValidationWindowOpened, setIsValidationWindowOpened] =
    useState(false);
  const [disableSubmit, setDisableSubmit] = useState(false);
  const setGlobalFormValues = useSetRecoilState(formValuesState);
  const setFormPolygonValue = useSetRecoilState(formPolygonState);

  const setSelectedSirenEventsState = useSetRecoilState(
    selectedSirenEventsState
  );

  const geoValues = useRecoilValue(geoCoderValues);
  const [transferredValues, setTransferredValues] = useRecoilState(
    formTransitionValuesState
  );
  const navigate = useNavigate();
  let location = useLocation();

  const {
    register,
    handleSubmit,
    control,
    getValues,
    setValue,
    reset,
    formState: { isDirty, isSubmitSuccessful, errors },
  } = useForm({
    defaultValues,
  });

  const { mutate, isLoading } = useMutation({
    onSuccess: () => {
      getSuccessSwal("הפרטים נשמרו בהצלחה");
      if (transferOperationValues?.isTransferringToOtherForm) {
        navigate(transferOperationValues.path);
      } else {
        navigate(closeLink);
        if (transferredValues) setTransferredValues();
      }
    },
    onError: () => {
      getFailureSwal("אירעה תקלה בעת שליחת הטופס, נסו שוב");
      setDisableSubmit(false);
    },
  });

  const titleTooLongHandler = (title) => {
    if (title.length >= MAX_TITLE_LEN)
      return title.substring(0, MAX_TITLE_LEN - 1) + "...";
    return title;
  };

  const onSubmit = (data) => {
    setDisableSubmit(true);
    mutate({ method, path: route, data });
    if (transferOperationValues?.isTransferringToOtherForm) {
      transferredValuesNames.forEach((value) =>
        value.transfferingTo.forEach((destenationField) => {
          setTransferredValues((values) => ({
            ...values,
            [destenationField]: data[value.valueName],
          }));
        })
      );
    }
    reset(data);
  };

  const onError = () => {
    setIsValidationWindowOpened(true);
  };

  useEffect(() => {
    setGlobalFormValues((prev) => ({
      ...defaultValues,
      ...prev,
      isActive: !isAccepted,
      isDirty,
      isSubmitSuccessful,
    }));

    setFormPolygonValue((prev) => {
      return {
        ...prev,
        data: defaultValues.relatedSirens
          ? { ...prev.data, sirens: defaultValues.relatedSirens }
          : prev.data,
      };
    });
  }, [
    setGlobalFormValues,
    setFormPolygonValue,
    defaultValues,
    isAccepted,
    isDirty,
    isSubmitSuccessful,
  ]);

  useEffect(
    () => () => {
      setGlobalFormValues({
        isActive: false,
        isDirty: false,
        isSubmitSuccessful: true,
      });
      setFormPolygonValue((prev) => {
        return {
          ...prev,
          data: emptyObjectValues(prev.data),
        };
      });
    },
    [setGlobalFormValues, setFormPolygonValue]
  );

  useEffect(() => {
    setValue("latitude", geoValues?.lat);
    setValue("longitude", geoValues?.lng);
  }, [setValue, geoValues]);

  useEffect(() => {
    if (!_.isEmpty(transferredValues)) {
      setGlobalFormValues(() => ({
        isActive: true,
        latitude: transferredValues?.latitude,
        longitude: transferredValues?.longitude,
        district: transferredValues?.district,
        subDistrict: transferredValues?.subDistrict,
      }));
      Object.keys(transferredValues).forEach((valueName) => {
        setValue(valueName, transferredValues[valueName]);
      });
    }
  }, [transferredValues, setValue, setGlobalFormValues]);

  useEffect(() => {
    if (transferredValues && !transferOperationValues) setTransferredValues();
  }, [
    location,
    transferredValues,
    setTransferredValues,
    transferOperationValues,
  ]);

  useEffect(() => {
    setSelectedSirenEventsState([]);
  }, [setSelectedSirenEventsState]);

  return (
    <>
      {isLoading && <LoadingIndicator />}
      <ValidationErrorDialog
        errors={errors}
        isOpened={isValidationWindowOpened}
        setIsValidationWindowOpened={setIsValidationWindowOpened}
      />
      <div className="form-container">
        <form onSubmit={handleSubmit(onSubmit, onError)}>
          <div key="introRow" className="form-first-row">
            <div>
              <Typography variant="h5" component="div">
                {titleTooLongHandler(title)}
                {isAccepted && "(הרשומה נשלחה, לא ניתן לערוך)"}
              </Typography>
              {defaultValues?.simulatorId && (
                <InputLabel>({defaultValues.simulatorId})</InputLabel>
              )}
            </div>
            <div>
              <IconButton
                className="control-icon"
                sx={{ backgroundColor: "#D9F6C8" }}
                type="submit"
                disabled={disableSubmit}
              >
                <Icon icon="mdi:content-save" color="84A771" fontSize="30px" />
              </IconButton>
              <ExitWithDialog
                closeLink={closeLink}
                isDirty={isDirty}
                isSubmitted={isSubmitSuccessful}
              />
            </div>
          </div>
          {formSchema.map((row, index) => (
            <div key={`formRow_${index}`} className="form-row">
              {Object.values(row).map((input) => (
                <FormField
                  key={`formField_${input.key}`}
                  obj={input}
                  control={control}
                  register={register}
                  getFieldsValues={getValues}
                  setFieldValue={setValue}
                  isFormDisabled={isAccepted}
                  route={route}
                />
              ))}
            </div>
          ))}
        </form>
        <DevTool placement="top-right" control={control} />
      </div>
    </>
  );
}

export default GenericForm;
