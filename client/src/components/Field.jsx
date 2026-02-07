export default function Field({ name, value = "", type = "text", onChange }) {
  const id = name.toLowerCase();

  return (
    <div className="field">
      <label htmlFor={id}>{name}:</label>
      <br />
      <input
        type={type}
        id={id}
        value={value}
        onChange={(e) => onChange(e.currentTarget.id, e.currentTarget.value)}
        style={{ backgroundColor: "rgb(29, 72, 103) " }}
      />
    </div>
  );
}
