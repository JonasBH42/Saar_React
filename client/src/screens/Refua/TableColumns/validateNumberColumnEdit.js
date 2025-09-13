import { toast } from "react-toastify";
import "react-toastify/ReactToastify.min.css";

export const validateNumberColumnEdit = (params) => {
  const hasError = params.props.value < 0;
  hasError &&
    toast("המספר צריך להיות חיובי", {
      draggablePercent: 10,
      position: "bottom-left",
      autoClose: 3000,
      closeOnClick: true,
      hideProgressBar: false,
      pauseOnHover: true,
      draggable: true,
      rtl: true,
      type: "error",
    });

  return { ...params.props, error: hasError };
};
