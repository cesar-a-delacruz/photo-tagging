import Field from "./Field";
import { useState, useEffect } from "react";

export default function DataForm({
  fields = [],
  empty = false,
  action = { name: "", handler: () => {} },
}) {
  const [data, setData] = useState({});

  useEffect(() => {
    setData(
      fields.reduce((acc, field) => {
        const key = field.name;
        acc[key] = !empty ? field.value : "";
        return acc;
      }, {}),
    );
  }, [fields]);

  const changeHandler = (id, value) => {
    setData((prev) => ({ ...prev, [id]: value }));
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        action.handler(data);
      }}
    >
      <div className="fields">
        {fields.map((field) => (
          <Field
            key={field.name}
            name={field.name}
            label={field.label}
            type={field.type}
            value={data[field.name]}
            onChange={changeHandler}
          />
        ))}
      </div>
      <button>{action.name}</button>
    </form>
  );
}
