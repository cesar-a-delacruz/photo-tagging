import GameContext from "@/contexts/GameContext";
import { useContext } from "react";

export default function Menu({
  position,
  items,
  currentItem,
  setFoundObjects = () => {},
}) {
  const foundObjects = useContext(GameContext).objects.found;

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
          onClick={() => {
            if (!currentItem) {
              alert("No has been character selected");
              setFoundObjects(null);
              return;
            } else if (foundObjects.includes(item.id)) {
              alert("This character was found already");
              setFoundObjects(null);
              return;
            }

            if (item.id === currentItem.id) {
              alert("Found " + item.name);
              setFoundObjects(item.id);
            } else {
              alert("Wrong character");
              setFoundObjects(null);
            }
          }}
        >
          {item.name}
        </div>
      ))}
    </div>
  );
}
