export default function Dialog({ children, title, action, ref }) {
  const className = title.toLowerCase().replace(" ", "-");

  return (
    <dialog className={className} ref={ref}>
      <h2>{title}</h2>
      <div className="content">{children}</div>
      <div className="actions">
        {action && <button onClick={action.handler}>{action.name}</button>}
        <button
          onClick={(e) => document.querySelector(`dialog.${className}`).close()}
        >
          Cancel
        </button>
      </div>
    </dialog>
  );
}
