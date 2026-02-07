import Target from "@/components/Target";
import Dialog from "@/components/Dialog";
import Timer from "@/components/Timer";
import useGame from "@/hooks/useGame";
import { useState, useRef } from "react";
import { useOutletContext } from "react-router-dom";

export default function Game() {
  const setTitle = useOutletContext();
  setTitle("Game");

  const { image, objects, setObjects } = useGame();
  const [boxPosition, setBoxPosition] = useState(null);
  const [currentObject, setCurrentObject] = useState(null);
  const imageDialog = useRef(null);
  const recordDialog = useRef(null);

  return (
    <>
      <div className="top">
        <div className="data">
          <div className="user">
            <p>
              Name: <span>Anon</span>
            </p>
            <p>
              Record: <span>00:00:00</span>
            </p>
          </div>
          <Timer />
        </div>
        <div className="options">
          <button onClick={(e) => (imageDialog.current.open = true)}>
            Change Image
          </button>
          <button onClick={(e) => (recordDialog.current.open = true)}>
            Reset Record
          </button>
        </div>
        <div className="dialogs">
          <Dialog title={"Change Image"} ref={imageDialog}>
            <div className="images">
              <div className="image">
                <p>Image 1</p>
                <button>Select</button>
              </div>
            </div>
          </Dialog>
          <Dialog
            title={"Reset Record"}
            action={{ name: "Reset", handler: () => {} }}
            ref={recordDialog}
          >
            <p>Are you sure you want to reset your record?</p>
          </Dialog>
        </div>
      </div>
      <div className="bottom">
        <h3>{image.name}</h3>
        <img
          src={image.url}
          alt={image.name}
          onClick={(e) => {
            const imgBoundingSides = {
              left: e.currentTarget.getBoundingClientRect().left,
              bottom: e.currentTarget.getBoundingClientRect().top,
            };
            const imgSizeRatio = {
              width: e.currentTarget.naturalWidth / e.currentTarget.clientWidth,
              height:
                e.currentTarget.naturalHeight / e.currentTarget.clientHeight,
            };
            const clickedPosition = {
              x: (e.pageX - imgBoundingSides.left) * imgSizeRatio.width,
              y: (e.pageY - imgBoundingSides.bottom) * imgSizeRatio.height,
            };
            const targetBoxCenter = 50;

            objects.forEach((object) => {
              if (
                clickedPosition.x < object.position.x + targetBoxCenter &&
                clickedPosition.x > object.position.x - targetBoxCenter &&
                clickedPosition.y < object.position.y + targetBoxCenter &&
                clickedPosition.y > object.position.y - targetBoxCenter
              ) {
                setCurrentObject(object);
              }
            });
            setBoxPosition({ x: e.pageX, y: e.pageY });
          }}
        />
        <div className="objects">
          <h3>Objects to find</h3>
          <ol>
            {objects.map((object) => (
              <li key={object.name}>
                {object.name}
                {object.found && (
                  <>
                    : <span>Found</span>
                  </>
                )}
              </li>
            ))}
          </ol>
        </div>
        {boxPosition && (
          <Target
            boxPosition={boxPosition}
            setBoxPosition={setBoxPosition}
            menuItems={objects}
            setItems={setObjects}
            currentItem={currentObject}
            setCurrentItem={setCurrentObject}
          />
        )}
      </div>
    </>
  );
}
