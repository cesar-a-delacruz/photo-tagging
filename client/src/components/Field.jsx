import { useEffect, useState } from "react";

export default function Field({ name, initialValue = "", type = "text" }) {
  const [value, setValue] = useState(initialValue);
  const id = name.toLowerCase();

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return (
    <div className="field">
      <label htmlFor={id}>{name}:</label>
      <input
        type={type}
        id={id}
        value={value}
        onChange={(e) => setValue(e.currentTarget.value)}
        style={{ backgroundColor: "rgb(29, 72, 103) " }}
      />
    </div>
  );
}
