import styles from "./styles/Field.module.css";

export default function Field({
  name,
  label,
  value = "",
  type = "text",
  onChange,
}) {
  let input;
  switch (type) {
    case "json":
      input = Object.keys(value).map((key) => (
        <div key={key}>
          <label htmlFor={key}>{key}:</label>
          <input
            type="text"
            id={key}
            value={value[key]}
            onChange={(e) =>
              onChange(e.currentTarget.id, e.currentTarget.value)
            }
          />
        </div>
      ));
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
      break;
  }
  return type !== "hidden" ? (
    <div className={styles.field}>
      {label && <label htmlFor={name}>{label}:</label>}
      {input}
    </div>
  ) : (
    input
  );
}
