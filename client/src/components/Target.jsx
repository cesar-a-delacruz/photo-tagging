export default function Target({ boxPosition, setBoxPosition, menuItems }) {
  return (
    <div className="target">
      <div
        className="box"
        style={{
          border: "5px red solid",
          width: "75px",
          height: "75px",
          position: "absolute",
          top: `${boxPosition.y - 37}px`,
          left: `${boxPosition.x - 37}px`,
        }}
        onClick={(e) => setBoxPosition(null)}
      ></div>
      <div
        className="menu"
        style={{
          backgroundColor: "rgb(22, 56, 80) ",
          padding: "15px 15px",
          position: "absolute",
          top: `${boxPosition.y - 37}px`,
          left: `${boxPosition.x + 50}px`,
        }}
      >
        {menuItems.map((item) => (
          <div className="item">{item.name}</div>
        ))}
      </div>
    </div>
  );
}
