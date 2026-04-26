import GameContext from "@/contexts/GameContext";
import { useContext } from "react";
import styles from "./styles/Menu.module.css";

export default function Menu({
  position,
  items,
  currentItem,
  setFoundObjects = () => {},
}) {
  const foundObjects = useContext(GameContext).objects.found;

  return (
    <div
      className={styles.menu}
      style={{
        top: `${position.y}px`,
        left: `${position.x}px`,
      }}
    >
      {items.map((item) => (
        <div
          key={item.name}
          className={styles.item}
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
