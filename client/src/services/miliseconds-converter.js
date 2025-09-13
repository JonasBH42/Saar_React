import { zeroPad } from "react-countdown";

export const millisecondsConvert = (milliseconds) => {
  const secondsAmount = Number(milliseconds / 1000);
  const days = Math.floor(secondsAmount / (3600 * 24));
  const hours = Math.floor((secondsAmount % (3600 * 24)) / 3600);
  const minutes = Math.floor((secondsAmount % 3600) / 60);
  const seconds = Math.floor(secondsAmount % 60);

  const time = `${zeroPad(days)}:${zeroPad(hours)}:${zeroPad(
    minutes
  )}:${zeroPad(seconds)}`;

  return time;
};
