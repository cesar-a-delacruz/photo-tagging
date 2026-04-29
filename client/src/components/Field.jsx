import styles from "./styles/Field.module.css";

export default function Field({
  name,
  label,
  value = "",
  type = "text",
  onChange,
  buttonInput = { text: "", handler: () => {} },
  url = "",
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
    case "file":
      input = (
        <>
          <input
            type={type}
            id={name}
            name={name}
            onChange={(e) => {
              const img = document.getElementById(`${name}Preview`);
              const file = e.currentTarget.files[0];
              img.src = file ? URL.createObjectURL(file) : "";
              img.style.display = file ? "block" : "none";
            }}
            accept="image/*"
          />
          <img
            src={url ? url : null}
            style={{ display: url ? "block" : "none" }}
            alt="Preview"
            id={`${name}Preview`}
          />
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
      break;
  }
  return (
    <div className={`${styles.field}`}>
      {type !== "json" ? (
        <>
          {label && <label htmlFor={name}>{label}:</label>}
          {input}
        </>
      ) : (
        field
      )}
    </div>
  );
}
