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
        if (field.type === "json") {
          acc[key] = !empty
            ? field.value
            : Object.keys(field.value).reduce((a, fv) => {
                a[fv] = "";
                return a;
              }, {});
        } else acc[key] = !empty ? field.value : "";
        return acc;
      }, {}),
    );
  }, [fields]);

  const changeHandler = (id, value) => {
    setData((prev) => {
      for (const key in prev) {
        if (key === id) {
          prev[id] = value;
          return { ...prev };
        } else if (
          typeof prev[key] === "object" &&
          !Array.isArray(prev[key]) &&
          prev[key] !== null
        ) {
          for (const k in prev[key]) {
            if (k === id) {
              prev[key][k] = value;
              return { ...prev };
            }
          }
        }
      }
    });
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        action.handler(data);
      }}
      onReset={() => {
        setData((prev) => {
          Object.keys(prev).forEach((key) => {
            if (
              typeof prev[key] === "object" &&
              !Array.isArray(prev[key]) &&
              prev[key] !== null
            ) {
              prev[key] = Object.keys(prev[key]).reduce((a, pk) => {
                a[pk] = "";
                return a;
              }, {});
            } else prev[key] = "";
          });
          return { ...prev };
        });
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
