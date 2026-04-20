import styles from "./styles/Pin.module.css";

export default function Pin({ position, setPosition }) {
  return (
    <img
      src="/images/pin.png"
      alt="Pin"
      className={styles.pin}
      style={{
        top: `${position.y - 75}px`,
        left: `${position.x - 37}px`,
      }}
      onClick={(e) => setPosition(null)}
    />
  );
}
