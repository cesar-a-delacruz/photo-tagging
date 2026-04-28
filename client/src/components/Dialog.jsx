import styles from "./styles/Dialog.module.css";

export default function Dialog({ children, title, ref }) {
  return (
    <dialog ref={ref}>
      <div className={styles.top}>
        <h2>{title}</h2>
        <img
          className={styles.exit}
          src="/icons/exit.svg"
          aria-label="Exit button"
          onClick={(e) => e.currentTarget.parentElement.parentElement.close()}
        />
      </div>
      <div className={styles.bottom}>{children}</div>
    </dialog>
  );
}
