import Field from "./Field";
import styles from "./styles/AlertForm.module.css";

export default function AlertForm({
  action = { name: "", handler: () => {} },
  data = {},
  children,
}) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        action.handler(data);
      }}
      className={styles.alert}
    >
      <p>{children}</p>
      <Field name={data.name} value={data.value} type={data.type} />
      <button className={styles.action}>{action.name}</button>
    </form>
  );
}
