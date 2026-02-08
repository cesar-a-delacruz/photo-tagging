import { useState, useEffect } from "react";
import Field from "./Field";

export default function AlertForm({
  field,
  action = { name: "", handler: () => {} },
  children,
}) {
  const [data, setData] = useState({});

  useEffect(() => {
    setData({ [field.name]: field.value });
  }, [field]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        action.handler(data);
      }}
    >
      <p>{children}</p>
      <Field name={field.name} value={field.value} type={"hidden"} />
      <button>{action.name}</button>
    </form>
  );
}
