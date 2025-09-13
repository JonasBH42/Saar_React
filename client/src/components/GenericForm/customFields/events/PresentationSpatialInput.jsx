import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { formValuesState } from "@states";
import { TextInput } from "../../FormField/FormField";

export function PresentationSpatialInput(props) {
  const formLocations = useRecoilValue(formValuesState);

  useEffect(() => {
    props.setFieldValue(props.obj.key, formLocations[props.obj.key]);
  }, [formLocations, props]);

  return <TextInput {...props} isFormDisabled={true} />;
}

export default PresentationSpatialInput;
