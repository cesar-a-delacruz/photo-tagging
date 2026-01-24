export default function TargetBox({ props, setProps }) {
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
    </>
  );
}
