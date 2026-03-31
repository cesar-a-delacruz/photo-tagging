import Dialog from "@/components/Dialog";
import Timer from "@/components/Timer";
import { useState, useRef } from "react";
import { useOutletContext } from "react-router-dom";
import useGetData from "@/hooks/useGetData";
import Menu from "@/components/Menu";
import Box from "@/components/Box";
import GameContext from "@/contexts/GameContext";
import DataForm from "@/components/DataForm";
import { formDataReducer } from "@/utils/objectHandler";
import requestHandler from "@/utils/requestHandler";

export default function Game() {
  const setTitle = useOutletContext();
  setTitle("Game");

  const [image, setImage] = useGetData("image/7");
  const [boxPosition, setBoxPosition] = useState(null);
  const [game, setGame] = useState({
    time: "",
    end: false,
    objects: {
      current: null,
      found: 0,
    },
  });
  const [formData, setFormData] = useState([
    { name: "name", label: "Name", value: "", type: "text" },
    { name: "record", label: "Record", value: "", type: "text" },
  ]);

  const imageDialog = useRef(null);
  const recordDialog = useRef(null);
  const winDialog = useRef(null);

  return (
    <GameContext value={game}>
      <>
        <div className="top">
          <div className="data">
            <div className="user">
              <p>
                Name: <span>{formData[0].value}</span>
              </p>
              <p>
                Record: <span>{formData[1].value}</span>
              </p>
            </div>
            <Timer
              setTime={(timeString) =>
                setGame((prev) => ({
                  ...prev,
                  time: timeString,
                }))
              }
            />
          </div>
          <div className="options">
            <button onClick={() => imageDialog.current.show()}>
              Change Image
            </button>
            <button onClick={() => recordDialog.current.show()}>
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
            <Dialog title={"Reset Record"} ref={recordDialog}>
              <p>Are you sure you want to reset your record?</p>
            </Dialog>
            <Dialog title={"Congratulations!!"} ref={winDialog}>
              <p>Input your name to save your record</p>
              <DataForm
                data={formData}
                setData={setFormData}
                action={{
                  name: "Save",
                  handler: async (data) => {
                    data = formDataReducer(data);
                    await requestHandler.post(data, "user");
                    setFormData((prev) =>
                      prev.map((field) => {
                        field.value = data[field.name];
                        return field;
                      }),
                    );
                    winDialog.current.close();
                  },
                }}
              />
            </Dialog>
          </div>
        </div>
        <div className="bottom">
          {image && (
            <>
              <h3>{image.name}</h3>
              <img
                src={image.url}
                alt={image.name}
                onClick={(e) => {
                  if (game.end) return;

                  const imgBoundingSides = {
                    left: e.currentTarget.getBoundingClientRect().left,
                    top: e.currentTarget.getBoundingClientRect().top,
                  };
                  const imgSizeRatio = {
                    width:
                      e.currentTarget.naturalWidth /
                      e.currentTarget.clientWidth,
                    height:
                      e.currentTarget.naturalHeight /
                      e.currentTarget.clientHeight,
                  };
                  const clickedPosition = {
                    x: (e.clientX - imgBoundingSides.left) * imgSizeRatio.width,
                    y: (e.clientY - imgBoundingSides.top) * imgSizeRatio.height,
                  };
                  const targetBoxCenter = 50;
                  image.objects.forEach((object) => {
                    if (
                      clickedPosition.x < object.position.x + targetBoxCenter &&
                      clickedPosition.x > object.position.x - targetBoxCenter &&
                      clickedPosition.y < object.position.y + targetBoxCenter &&
                      clickedPosition.y > object.position.y - targetBoxCenter
                    ) {
                      setGame((prev) => ({
                        ...prev,
                        objects: { current: object, found: prev.objects.found },
                      }));
                    }
                  });
                  setBoxPosition({ x: e.pageX, y: e.pageY });
                }}
              />
            </>
          )}
          <div className="objects">
            <h3>Objects to find</h3>
            <ol>
              {image &&
                image.objects.map((object) => (
                  <li key={object.id}>{object.name}</li>
                ))}
            </ol>
          </div>
          {boxPosition && image && (
            <div className="target">
              <Box position={boxPosition} setPosition={setBoxPosition} />
              <Menu
                position={{ x: boxPosition.x + 50, y: boxPosition.y - 37 }}
                items={image.objects}
                currentItem={game.objects.current}
                setFoundObjects={(amount) => {
                  const gameEnd = amount === image.objects.length;

                  setGame((prev) => ({
                    ...prev,
                    end: gameEnd,
                    objects: { current: null, found: amount },
                  }));

                  if (gameEnd) {
                    setFormData((prev) =>
                      prev.map((field) => {
                        if (field.name === "record") field.value = game.time;
                        return field;
                      }),
                    );
                    winDialog.current.show();
                  }
                }}
              />
            </div>
          )}
        </div>
      </>
    </GameContext>
  );
}
