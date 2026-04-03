import { useRef, useState } from "react";

export default function Timer({
  record = "",
  setRecord = () => {},
  stop = false,
}) {
  if (record !== "00:00") return;

  const [time, setTime] = useState("");
  const start = useRef(new Date().valueOf());

  const interval = useRef(
    setInterval(() => {
      let timeString = new Date(
        new Date().valueOf() - start.current,
      ).toLocaleTimeString();

      const timeStart = timeString.substring(0, timeString.indexOf(":") + 1);
      const timeEnd = timeString.substring(
        timeString.lastIndexOf(" "),
        timeString.length,
      );

      timeString = timeString.replace(timeStart, "").replace(timeEnd, "");
      setTime(timeString);
    }, 1000),
  );

  if (stop) {
    clearInterval(interval.current);
    setRecord(time);
  }

  return (
    <div className="time">
      <p>
        Time: <span>{time}</span>
      </p>
    </div>
  );
}
