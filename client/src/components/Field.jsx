import styles from "./styles/Field.module.css";

export default function Field({
  name,
  label,
  value = "",
  type = "text",
  onChange,
  buttonInput = { text: "", handler: () => {} },
}) {
  let input;
  let field;
  switch (type) {
    case "json":
      input = (
        <>
          <div className="input">
            <div className={styles.value}>
              {Object.keys(value).map((key) => (
                <div key={key} className={`${styles.entry} ${key}`}>
                  <label htmlFor={key}>{key}:</label>
                  <input
                    type="text"
                    id={key}
                    value={value[key]}
                    onChange={(e) =>
                      onChange(e.currentTarget.id, e.currentTarget.value)
                    }
                    disabled={true}
                  />
                </div>
              ))}
            </div>
          </div>
        </>
      );
      field = (
        <>
          <div className={styles.label}>
            <label htmlFor={name}>{label}:</label>
            <button
              onClick={(e) => {
                e.preventDefault();
                buttonInput.handler();
              }}
            >
              {buttonInput.text}
            </button>
          </div>
          {input}
        </>
      );
      break;
    default:
      input = (
        <input
          type={type}
          id={name}
          value={value}
          onChange={(e) => onChange(e.currentTarget.id, e.currentTarget.value)}
        />
      );
      field = (
        <>
          {label && <label htmlFor={name}>{label}:</label>}
          {input}
        </>
      );
      break;
  }
  return type !== "hidden" ? (
    <div className={`${styles.field} ${styles[type]}`}>{field}</div>
  ) : (
    input
  );
}
