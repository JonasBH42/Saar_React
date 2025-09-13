import React from "react";
import Countdown, { zeroPad } from "react-countdown";
import { useEnvironment } from "@hooks";

function CountdownRenderer({ days, hours, minutes, seconds, props }) {
  return (
    <div
      style={{
        width: 250,
        textAlign: "center",
        borderRadius: 5,
        padding: 10,
      }}
    >
      {props.title && (
        <div style={{ fontSize: 25, color: "black", fontFamily: "Open Sans" }}>
          {props.title}
        </div>
      )}
      <span
        style={{
          fontSize: 30,
          fontFamily: "Orbitron",
          color: "#1A5276",
          fontWeight: "bold",
        }}
      >
        {days ? days + ":" : ""}
        {zeroPad(hours)}:{zeroPad(minutes)}:{zeroPad(seconds)}
      </span>
    </div>
  );
}

export default function WarClock({ title = "שעון לחימה" }) {
  const { warClock: warClockZeroTime } = useEnvironment();

  if (!warClockZeroTime) return null;
  return (
    <div
      style={{ backgroundColor: "#E9FAFB", borderRadius: "5px", margin: 10 }}
    >
      <Countdown
        date={new Date(warClockZeroTime)}
        autoStart
        precision={3}
        intervalDelay={0}
        overtime
        isNeutral
        title={title}
        renderer={(props) => <CountdownRenderer {...props} />}
      />
    </div>
  );
}
