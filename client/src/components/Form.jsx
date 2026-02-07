import Field from "./Field";
export default function Form({ fields = [], empty = false }) {
  return (
    <div className="form">
      {fields.map((field) =>
        !empty ? (
          <Field key={field.name} {...field} />
        ) : (
          <Field key={field.name} name={field.name} type={field.type} />
        ),
      )}
    </div>
  );
}
