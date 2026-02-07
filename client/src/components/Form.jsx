import Field from "./Field";
import { useState, useEffect } from "react";

export default function Form({ fields = [], empty = false, action }) {
  const [data, setData] = useState({});

  useEffect(() => {
    setData(
      fields.reduce((acc, field) => {
        const key = field.name.toLowerCase();
        acc[key] = !empty ? field.value : "";
        return acc;
      }, {}),
    );
  }, [fields]);

  const changeHandler = (id, value) => {
    setData((prev) => ({ ...prev, [id]: value }));
  };
  const submitHandler = (e) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={(e) => submitHandler(e)}>
      <div className="fields">
        {fields.map((field) => (
          <Field
            key={field.name}
            name={field.name}
            type={field.type}
            value={data[field.name.toLowerCase()]}
            onChange={changeHandler}
          />
        ))}
      </div>
      <button onClick={(e) => action.handler()}>{action.name}</button>
    </form>
  );
}
