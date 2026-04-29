import { useEffect, useRef, useState } from "react";
import styles from "./styles/Timer.module.css";

export default function Timer({
  record = "",
  setRecord = () => {},
  stop = false,
}) {
  if (record !== "00:00") return;

  const [time, setTime] = useState("");
  const startTime = useRef(new Date().valueOf());

  const interval = useRef(null);

  useEffect(() => {
    interval.current = setInterval(() => {
      let timeString = new Date(
        new Date().valueOf() - startTime.current,
      ).toLocaleTimeString();

      const timeStart = timeString.substring(0, timeString.indexOf(":") + 1);
      const timeEnd = timeString.substring(
        timeString.lastIndexOf(" "),
        timeString.length,
      );
      console.log("time");
      timeString = timeString.replace(timeStart, "").replace(timeEnd, "");
      setTime(timeString);
    }, 1000);
  }, []);

  if (stop) {
    clearInterval(interval.current);
    setRecord(time);
  }

  return (
    <div className={styles.timer}>
      <img src="/icons/clock.svg" alt="Time" className="icon" />
      <span>{time}</span>
    </div>
  );
}
