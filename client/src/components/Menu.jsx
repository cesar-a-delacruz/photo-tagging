import { useState } from "react";

export default function Menu({
  position,
  items,
  setItems,
  currentItem,
  setCurrentItem,
}) {
  const [foundAmount, setFoundAmount] = useState(0);

  return (
    <div
      className="menu"
      style={{
        backgroundColor: "rgb(22, 56, 80) ",
        padding: "15px 15px",
        position: "absolute",
        top: `${position.y}px`,
        left: `${position.x}px`,
      }}
    >
      {items.map((item) => (
        <div
          key={item.name}
          className="item"
          onClick={(e) => {
            if (foundAmount === items.length) return;
            if (!currentItem) alert("No character selected");

            if (item.name === currentItem.name) {
              setItems(
                "objects",
                items.map((i) =>
                  i.id === item.id ? { ...item, found: true } : i,
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
  );
}
