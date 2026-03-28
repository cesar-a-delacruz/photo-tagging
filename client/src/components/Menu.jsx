import GameContext from "@/contexts/GameContext";
import { useContext } from "react";

export default function Menu({
  position,
  items,
  currentItem,
  setFoundObjects = () => {},
}) {
  const foundObjects = useContext(GameContext).foundObjects;

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
            if (!currentItem) alert("No character selected");

            if (item.name === currentItem.name) {
              setFoundObjects(foundObjects + 1);
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
