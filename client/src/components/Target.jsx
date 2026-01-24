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
        <div className="item">Item 1</div>
        <div className="item">Item 2</div>
        <div className="item">Item 3</div>
      </div>
    </>
  );
}
