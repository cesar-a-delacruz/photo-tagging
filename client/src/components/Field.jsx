export default function Field({
  name,
  label,
  value = "",
  type = "text",
  onChange,
}) {
  return (
    <div className="field">
      {label && (
        <>
          <label htmlFor={name}>{label}:</label>
          <br />
        </>
      )}
      <input
        type={type}
        id={name}
        value={value}
        onChange={(e) => onChange(e.currentTarget.id, e.currentTarget.value)}
        style={{ backgroundColor: "rgb(29, 72, 103) " }}
      />
    </div>
  );
}
