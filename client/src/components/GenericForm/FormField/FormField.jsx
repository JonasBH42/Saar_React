import { memo, useEffect } from "react";
import { Controller } from "react-hook-form";
import {
  TextField,
  Checkbox,
  FormControlLabel,
  FormGroup,
  InputLabel,
  Select,
  MenuItem,
  Rating,
  Switch,
} from "@mui/material";
import { CircleOutlined, Circle } from "@mui/icons-material";
import DateAdapter from "@mui/lab/AdapterMoment";
import { LocalizationProvider, DesktopDateTimePicker } from "@mui/lab";
import { useQuery } from "react-query";
import { useRecoilState } from "recoil";
import moment from "moment";
import { INPUT_TYPES } from "@constants";
import { formValuesState } from "@states";
import "./FormField.css";

function FormField(props) {
  switch (props.obj.type) {
    case INPUT_TYPES.title:
      return <Title {...props} />;
    case INPUT_TYPES.dropDown:
      return <SelectInput {...props} />;
    case INPUT_TYPES.date:
      return <DateInput {...props} />;
    case INPUT_TYPES.number:
      return <NumberInput {...props} />;
    case INPUT_TYPES.checkbox:
      return <CheckboxInput {...props} />;
    case INPUT_TYPES.switch:
      return <SwitchInput {...props} />;
    case INPUT_TYPES.longText:
      return <LongTextInput {...props} />;
    case INPUT_TYPES.rating:
      return <RatingInput {...props} />;
    case INPUT_TYPES.stateOriented:
      return <StateOrientedInput {...props} />;
    case INPUT_TYPES.custom:
      return props.obj.Element ? (
        <props.obj.Element {...props} />
      ) : (
        <TextInput {...props} />
      );

    default:
      return <TextInput {...props} />;
  }
}

function Title({ obj }) {
  return (
    <div
      key={obj.key}
      style={{
        color: "white",
        backgroundColor: "rgb(96, 199, 214)",
        padding: "5px",
        margin: "2vh 0px",
      }}
    >
      {obj.label}
    </div>
  );
}

export function TextInput({ obj, register, isFormDisabled, defaultValue }) {
  return (
    <div key={obj.key} className="general-input">
      <InputLabel required={obj.required}>{obj.label}</InputLabel>
      <TextField
        key={obj.key}
        {...register(obj.key, obj.validation)}
        variant="outlined"
        required={obj.required}
        fullWidth={true}
        disabled={obj.disabled || isFormDisabled}
        defaultValue={defaultValue ?? obj.defaultValue}
        placeholder={obj.placeholder}
      />
    </div>
  );
}

function SelectInput({ obj, control, isFormDisabled, route }) {
  const { data } = useQuery([`enums/${route}/${obj.key}`], {
    staleTime: Infinity,
  });

  return (
    <div key={obj.key} className="general-input">
      <InputLabel required={obj.required}>{obj.label}</InputLabel>
      <Controller
        name={obj.key}
        control={control}
        defaultValue={obj.defaultValue}
        render={({ field: { onChange, value } }) => (
          <Select
            onChange={onChange}
            value={data && value ? (value?.ID ? value?.ID : value) : ""}
            required={obj.required}
            disabled={obj.disabled || isFormDisabled}
          >
            {Object.values({ ...data }).map((value) => (
              <MenuItem key={obj.key + value.ID} value={value.ID}>
                {value.Name}
              </MenuItem>
            ))}
          </Select>
        )}
      />
    </div>
  );
}
function DateInput({ obj, control, isFormDisabled, defaultValue }) {
  const currDateTime = moment();

  return (
    <div key={obj.key} className="general-input">
      <InputLabel required={obj.required}>{obj.label}</InputLabel>
      <LocalizationProvider dateAdapter={DateAdapter}>
        <Controller
          rules={obj.validation}
          name={obj.key}
          control={control}
          defaultValue={
            moment(defaultValue) ??
            (obj.defaultValue ? currDateTime.toDate() : null)
          }
          render={({ field }) => (
            <DesktopDateTimePicker
              minDateTime={currDateTime}
              value={field.value}
              onChange={(date) => field.onChange(date)}
              renderInput={(params) => <TextField {...params} />}
              ampm={false}
              disabled={obj.disabled || isFormDisabled}
              inputFormat="DD/MM/YYYY HH:mm"
            />
          )}
        />
      </LocalizationProvider>
    </div>
  );
}

export function NumberInput({ obj, register, isFormDisabled }) {
  return (
    <div
      key={obj.key}
      style={{ width: "5vw", marginLeft: "1.55vw", marginTop: "0.5vw" }}
    >
      <InputLabel required={obj.required}>{obj.label}</InputLabel>
      <TextField
        key={obj.key}
        defaultValue={obj.defaultValue}
        {...register(obj.key, obj.validation)}
        type="number"
        variant="outlined"
        required={obj.required}
        fullWidth={true}
        InputProps={{ inputProps: { min: obj.min ?? 0, max: obj.max } }}
        disabled={obj.disabled || isFormDisabled}
      />
    </div>
  );
}

function CheckboxInput({ obj, control, isFormDisabled }) {
  return (
    <div key={obj.key} className="general-input">
      <Controller
        name={obj.key}
        control={control}
        render={({ field }) => (
          <FormGroup>
            <FormControlLabel
              label={obj.label}
              control={
                <Checkbox
                  onChange={(e) => field.onChange(e.target.checked)}
                  checked={field.value ?? false}
                  size="large"
                  disabled={obj.disabled || isFormDisabled}
                />
              }
            />
          </FormGroup>
        )}
      />
    </div>
  );
}

function SwitchInput({ obj, control, isFormDisabled }) {
  return (
    <div key={obj.key} className="general-input">
      <Controller
        name={obj.key}
        control={control}
        defaultValue={false}
        render={({ field }) => (
          <FormGroup>
            <FormControlLabel
              label={obj.label}
              control={
                <Switch
                  onChange={(e) => field.onChange(e.target.checked)}
                  checked={field.value ?? false}
                  size="large"
                  disabled={obj.disabled || isFormDisabled}
                />
              }
            />
          </FormGroup>
        )}
      />
    </div>
  );
}

function LongTextInput({ obj, register, isFormDisabled }) {
  return (
    <div
      key={obj.key}
      style={{
        width: "38vw",
        marginLeft: "2vw",
        marginTop: "0.5vw",
      }}
    >
      <InputLabel required={obj.required}>{obj.label}</InputLabel>
      <TextField
        key={obj.key}
        {...register(obj.key, obj.validation)}
        variant="outlined"
        required={obj.required}
        fullWidth={true}
        multiline={true}
        disabled={obj.disabled || isFormDisabled}
        defaultValue={obj.defaultValue}
      />
    </div>
  );
}

function RatingInput({ obj, control, isFormDisabled }) {
  return (
    <div key={obj.key} style={{ alignSelf: "center", width: "12vw" }}>
      <InputLabel required={obj.required}>{obj.label}</InputLabel>
      <Controller
        name={obj.key}
        control={control}
        defaultValue={obj.defaultValue}
        render={({ field }) => (
          <Rating
            value={field.value}
            style={{ direction: "ltr" }}
            onChange={(_, newValue) => field.onChange(newValue)}
            icon={<Circle fontSize="inherit" />}
            emptyIcon={<CircleOutlined fontSize="inherit" />}
            size="large"
            disabled={obj.disabled || isFormDisabled}
          />
        )}
      />
    </div>
  );
}

function StateOrientedInput({
  obj,
  control,
  register,
  getFieldsValues,
  setFieldValue,
  isFormDisabled,
}) {
  const [globalFormValues, setGlobalFormValues] =
    useRecoilState(formValuesState);
  const { key } = obj;
  const globalValue = globalFormValues[key];

  useEffect(() => {
    if (globalValue && getFieldsValues(key) !== globalValue) {
      setFieldValue(key, globalValue, { shouldDirty: true });
    }
  }, [globalValue, key, getFieldsValues, setFieldValue]);

  return (
    <div key={key} className="general-input">
      <InputLabel required={obj.required}>{obj.label}</InputLabel>
      <Controller
        control={control}
        name={key}
        render={({ field: { name } }) => (
          <TextField
            key={key}
            {...register(key, obj.validation)}
            type="number"
            variant="outlined"
            required={obj.required}
            disabled={obj.disabled || isFormDisabled}
            fullWidth={true}
            InputProps={{
              inputProps: {
                min: obj.validation?.min ?? 0.0,
                step: "any",
                max: obj.validation?.max,
              },
            }}
            onChange={(e) =>
              setGlobalFormValues((prev) => ({
                ...prev,
                [name]: e.target.value,
              }))
            }
          />
        )}
      />
    </div>
  );
}

export default memo(FormField);
