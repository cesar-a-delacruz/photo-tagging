export default function Target({ props, setProps }) {
  return (
    <>
      <div
        className="target-box"
        style={{
          border: "5px red solid",
          width: "75px",
          height: "75px",
          position: "absolute",
          top: `${props.y - 37}px`,
          left: `${props.x - 37}px`,
        }}
        onClick={(e) => setProps({})}
      ></div>
      <div
        className="target-menu"
        style={{
          backgroundColor: "rgb(22, 56, 80) ",
          padding: "15px 15px",
          position: "absolute",
          top: `${props.y - 37}px`,
          left: `${props.x + 50}px`,
        }}
      >
        {props.items.map((item) => (
          <div className="item">{item.name}</div>
        ))}
      </div>
    </>
  );
}
