import { useState } from "react";
export default function Target({
  boxPosition,
  setBoxPosition,
  menuItems,
  setItems,
  currentItem,
  setCurrentItem,
}) {
  const [foundAmount, setFoundAmount] = useState(0);
  return (
    <div className="target">
      <div
        className="box"
        style={{
          border: "5px red solid",
          width: "100px",
          height: "100px",
          position: "absolute",
          top: `${boxPosition.y - 50}px`,
          left: `${boxPosition.x - 50}px`,
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
          <div
            key={item.name}
            className="item"
            onClick={(e) => {
              if (foundAmount === menuItems.length) return;
              if (!currentItem) alert("No character selected");

              if (item.name === currentItem.name) {
                setItems((prev) =>
                  prev.map((p) =>
                    p.name === item.name ? { ...item, found: true } : p,
                  ),
                );
                setFoundAmount(foundAmount + 1);
                setCurrentItem(null);

                alert("Found " + item.name);
                e.currentTarget.style = "background-color: grey";
              } else {
                alert("Wrong character");
              }
            }}
          >
            {item.name}
          </div>
        ))}
      </div>
    </div>
  );
}
