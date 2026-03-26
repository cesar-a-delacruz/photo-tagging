import Field from "./Field";

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
    >
      <p>{children}</p>
      <Field name={data.name} value={data.value} type={data.type} />
      <button>{action.name}</button>
    </form>
  );
}
