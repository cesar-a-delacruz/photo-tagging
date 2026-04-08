export default function Dialog({ children, title, ref }) {
  const className = title.toLowerCase().replace(" ", "-");

  return (
    <dialog
      className={className}
      ref={ref}
      style={{
        backgroundColor: "rgb(22, 56, 80) ",
      }}
    >
      <div className="top">
        <h2>{title}</h2>
        <button
          onClick={(e) => e.currentTarget.parentElement.parentElement.close()}
        >
          X
        </button>
      </div>
      <div className="bottom">{children}</div>
    </dialog>
  );
}
