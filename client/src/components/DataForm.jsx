import { isObject } from "@/utils/objectHandler";
import Field from "./Field";

export default function DataForm({
  action = { name: "", handler: () => {} },
  data = [],
  setData = () => {},
}) {
  const changeHandler = (id, value) => {
    setData((prev) => {
      for (let i = 0; i < prev.length; i++) {
        if (prev[i].name === id) {
          prev[i].value = value;
          return [...prev];
        } else if (isObject(prev[i].value)) {
          for (const key in prev[i].value) {
            if (key === id) {
              prev[i].value[key] = value;
              return [...prev];
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
          for (let i = 0; i < prev.length; i++) {
            if (isObject(prev[i].value)) {
              prev[i].value = Object.keys(prev[i].value).reduce((acc, key) => {
                acc[key] = "";
                return acc;
              }, {});
            } else prev[i].value = "";
          }
          return [...prev];
        });
      }}
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
