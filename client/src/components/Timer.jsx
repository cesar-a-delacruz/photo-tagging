import { useEffect, useRef, useState } from "react";
import styles from "./styles/Timer.module.css";

export default function Timer({
  record = "",
  setRecord = () => {},
  start = true,
}) {
  if (record !== "") return;

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
      timeString = timeString.replace(timeStart, "").replace(timeEnd, "");
      setTime(timeString);
    }, 1000);
  }, []);

  useEffect(() => {
    if (!start) {
      clearInterval(interval.current);
      setRecord(time);
    }
  }, [start]);

  return (
    <div className={styles.timer}>
      <img src="/icons/clock.svg" alt="Time" className="icon" />
      <span>{time}</span>
    </div>
  );
}
