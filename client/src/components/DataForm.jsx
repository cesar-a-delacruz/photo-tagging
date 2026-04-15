import Field from "./Field";
import styles from "./styles/DataForm.module.css";

export default function DataForm({
  action = { name: "", handler: () => {} },
  data = [],
  dispatchFormData = () => {},
}) {
  const changeHandler = (id, value) => {
    dispatchFormData({ type: "change", payload: { id, value } });
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        action.handler(data);
      }}
      onReset={() => dispatchFormData({ type: "clear" })}
      className={styles.data}
    >
      <div className={styles.fields}>
        {data.map((field) => (
          <Field
            key={field.name}
            name={field.name}
            label={field.label}
            type={field.type}
            value={field.value}
            onChange={changeHandler}
          />
        ))}
      </div>
      <div className={styles.actions}>
        <button type="submit">{action.name}</button>
        <button type="reset">Cancel</button>
      </div>
    </form>
  );
}
