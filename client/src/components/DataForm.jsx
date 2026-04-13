import Field from "./Field";

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
    >
      <div className="fields">
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
      <div className="buttons">
        <button className="action" type="submit">
          {action.name}
        </button>
        <button className="cancel" type="reset">
          Cancel
        </button>
      </div>
    </form>
  );
}
