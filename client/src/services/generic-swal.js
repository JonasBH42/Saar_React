import * as swal from "sweetalert";

const TIMER_FAILED_SWAL = 5000;
const TIMER_SUCCEED_SWAL = 1500;

export function getSuccessSwal(text) {
  return swal({
    title: "Saved successfuly",
    text: text,
    icon: "success",
    timer: TIMER_SUCCEED_SWAL,
  });
}

export function getFailureSwal(text) {
  return swal({
    title: "Failed to succeed",
    text: text,
    icon: "error",
    timer: TIMER_FAILED_SWAL,
  });
}
