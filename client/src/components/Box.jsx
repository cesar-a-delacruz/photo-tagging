export default function Box({ position, setPosition }) {
  return (
    <div
      className="box"
      style={{
        border: "5px red solid",
        width: "100px",
        height: "100px",
        position: "absolute",
        top: `${position.y - 50}px`,
        left: `${position.x - 50}px`,
      }}
      onClick={(e) => setPosition(null)}
    ></div>
  );
}
