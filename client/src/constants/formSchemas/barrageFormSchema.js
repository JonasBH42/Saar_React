import { useRecoilValue } from "recoil";
import { NumberInput } from "@components/GenericForm/FormField/FormField";
import { INPUT_TYPES, barrageFields, eventFields } from "@constants";
import { formValuesState } from "@states";
import PresentationSpatialInput from "@components/GenericForm/customFields/events/PresentationSpatialInput";

export const barrageFormSchema = [
  {
    title: {
      key: "generalData",
      label: "נתונים כלליים",
      type: INPUT_TYPES.title,
    },
  },
  {
    sourceName: {
      ...barrageFields.sourceName,
    },
    missileCategory: {
      ...barrageFields.missileCategory,
    },
    missileType: {
      ...barrageFields.missileType,
    },
  },
  {
    longitude: {
      ...barrageFields.longitude,
    },
    latitude: {
      ...barrageFields.latitude,
    },
    azimut: {
      ...barrageFields.azimut,
    },
  },
  {
    radius1: {
      ...barrageFields.radius1,
    },
    radius2: {
      ...barrageFields.radius2,
    },
    sendTimeScheduledAt: {
      ...barrageFields.sendTimeScheduledAt,
    },
  },
  {
    district: {
      ...eventFields.district,
      Element: (props) => <PresentationSpatialInput {...props} />,
    },
    subDistrict: {
      ...eventFields.subDistrict,
      Element: (props) => <PresentationSpatialInput {...props} />,
    },
    sourceCountry: {
      ...barrageFields.sourceCountry,
    },
  },
  {
    moreEllipses: {
      key: "moreEllipses",
      label: "אליפסות נוספות",
      type: INPUT_TYPES.title,
    },
  },
  {
    barrageRadius: {
      ...barrageFields.barrageRadius,
    },
    vibeEllipsesNumber: {
      ...barrageFields.vibeEllipsesNumber,
    },
    vibeEventsNumber: {
      ...barrageFields.vibeEventsNumber,

      Element: (props) => {
        const globalFormValues = useRecoilValue(formValuesState);

        props.obj.max = globalFormValues.vibeEllipsesNumber ?? 0;

        return <NumberInput {...props} />;
      },
    },
  },
];
