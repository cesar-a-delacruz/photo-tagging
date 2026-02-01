import { useRef, useState } from "react";

export default function Timer() {
  const [time, setTime] = useState("");
  const start = useRef(new Date().valueOf());
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
  }, 1000);

  return (
    <div className="time">
      <p>
        Time: <span>{time}</span>
      </p>
    </div>
  );
}
